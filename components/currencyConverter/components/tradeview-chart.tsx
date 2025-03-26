import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DatePickerWithRange } from "./date-picker-tabs";
import { CurrencyPicker } from "./currency-picker";

interface ChartComponentProps {
  data?: { time: string; value: number }[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
  state: {
    labels: string[];
    datasets: {
      label: string;
      data: string[];
    }[];
  };
  currentRange: any;
  setCurrentRange: any;
  to: any;
  setTo: any;
  from: any;
  setFrom: any;
  currencyName: any;
  setCurrencyName: any;
}

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const {
    colors: {
      backgroundColor = "#fff",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
    state,
    currentRange,
    setCurrentRange,
  } = props;

  // const [currentRange, setCurrentRange] = useState<any>(undefined);

  const handleDateChange = (range: { from: Date; to: Date } | undefined) => {
    setCurrentRange(range);
  };

  const filteredData = useMemo(() => {
    if (!state || !state.datasets[0].data || !state.datasets[1].data) return [];

    // Create a Map to store the latest value for each unique date
    const latestDataMap = new Map();

    state.labels.forEach((label, index) => {
      const buyingValue = parseFloat(state.datasets[0].data[index]);
      const sellingValue = parseFloat(state.datasets[1].data[index]);
      const time = formatDate(parseDate(label));

      // If buyingValue is falsy, skip this entry
      if (!buyingValue) return;

      // If currentRange exists, ensure the date is within range
      const date = new Date(time);
      if (
        currentRange &&
        (date < currentRange.from || date > currentRange.to)
      ) {
        return;
      }

      // Update the Map with the latest value for the date
      latestDataMap.set(time, { time, value: buyingValue });
    });

    // Convert the Map values to an array and sort by date
    return Array.from(latestDataMap.values()).sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
  }, [state, currentRange]);

  const sellingFilteredData = useMemo(() => {
    if (!state || !state.datasets[0].data || !state.datasets[1].data) return [];

    // Create a Map to store the latest value for each unique date
    const latestDataMap = new Map();

    state.labels.forEach((label, index) => {
      const sellingValue = parseFloat(state.datasets[1].data[index]);
      const time = formatDate(parseDate(label));

      // If buyingValue is falsy, skip this entry
      if (!sellingValue) return;

      // If currentRange exists, ensure the date is within range
      const date = new Date(time);
      if (
        currentRange &&
        (date < currentRange.from || date > currentRange.to)
      ) {
        return;
      }

      // Update the Map with the latest value for the date
      latestDataMap.set(time, { time, value: sellingValue });
    });

    // Convert the Map values to an array and sort by date
    return Array.from(latestDataMap.values()).sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
  }, [state, currentRange]);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const sellingSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  const formatNumber = (number: number | null | undefined): string => {
    return number && number > 0
      ? new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(number)
      : "-";
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current!.clientWidth,
        });
        chartRef.current.timeScale().fitContent();
      }
    };

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      grid: {
        vertLines: { color: "#fff" },
        horzLines: { color: "#f2f2f2" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightPriceScale: {
        visible: true,
        borderColor: "#3434343c",
      },
      timeScale: {
        borderColor: "#3434343c",
        rightOffset: 0, // Avoids additional scrolling
        minBarSpacing: 1,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });

    // Buying series
    seriesRef.current = chartRef.current.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineType: 0,
      lineWidth: 4,
      priceFormat: {
        type: "custom",
        formatter: function (price: number) {
          return `₵${formatNumber(price)}`;
        },
      },
    });
    seriesRef.current.setData(filteredData);

    // Selling series
    sellingSeriesRef.current = chartRef.current.addAreaSeries({
      lineColor: "#12ac50",
      topColor: "#33ac64",
      bottomColor: "#54da8a41",
      lineType: 0,
      lineWidth: 4,
      priceFormat: {
        type: "custom",
        formatter: function (price: number) {
          return `₵${formatNumber(price)}`;
        },
      },
    });
    sellingSeriesRef.current.setData(sellingFilteredData);

    chartRef.current.timeScale().fitContent();

    const handleCrosshairMove = (param: any) => {
      if (
        !tooltipRef.current ||
        !param.time ||
        !seriesRef.current ||
        !sellingSeriesRef.current ||
        !param.point
      ) {
        tooltipRef.current && (tooltipRef.current.style.display = "none");
        return;
      }

      const buyingData = param.seriesData.get(seriesRef.current);
      const sellingData = param.seriesData.get(sellingSeriesRef.current);
      const buyingPrice = buyingData?.value ?? buyingData?.close ?? null;
      const sellingPrice = sellingData?.value ?? sellingData?.close ?? null;

      if (buyingPrice === null || sellingPrice === null) {
        tooltipRef.current.style.display = "none";
        return;
      }

      // Format param.time to DD-MM-YYYY
      const time = new Date(param.time); // param.time is in UNIX timestamp format
      const formattedTime = `${String(time.getDate()).padStart(
        2,
        "0"
      )}-${String(time.getMonth() + 1).padStart(2, "0")}-${time.getFullYear()}`;

      tooltipRef.current.style.display = "block";
      tooltipRef.current.style.pointerEvents = "none";
      tooltipRef.current.style.transition =
        "opacity 0.2s ease-in-out, transform 0.2s ease-in-out";
      tooltipRef.current.style.opacity = "1";
      tooltipRef.current.innerHTML = `
    <div style="color: #292929; margin-bottom:5px;white-space:nowrap;">${formattedTime}</div>
    <div style="color: #2962FF;white-space:nowrap;">Buying: ₵${formatNumber(
      buyingPrice
    )}</div>
    <div style="color: #069a41;white-space:nowrap;">Selling: ₵${formatNumber(
      sellingPrice
    )}</div>
  `;

      requestAnimationFrame(() => {
        const { x, y } = param.point;
        if (tooltipRef.current) {
          tooltipRef.current.style.left = `${x}px`;
          tooltipRef.current.style.top = `${y - 50}px`;
        }
      });
    };

    chartRef.current.subscribeCrosshairMove(handleCrosshairMove);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.unsubscribeCrosshairMove(handleCrosshairMove);
        chartRef.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filteredData,
    sellingFilteredData,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        marginTop: "80px",
      }}
    >
      <div
        ref={chartContainerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          zIndex: 1,
        }}
      />

      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          padding: "8px",
          boxSizing: "border-box",
          fontSize: "12px",
          textAlign: "left",
          backgroundColor: "#fff",
          border: "none",
          color: "white",
          borderRadius: "4px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          zIndex: 1000,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-70px",
          left: "10px",
          zIndex: 2,
        }}
      >
        <DatePickerWithRange onChange={handleDateChange} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "-70px",
          right: "10px",
          zIndex: 2,
        }}
      >
        <CurrencyPicker
          currencyObj={{
            to: props.to,
            from: props.from,
            setTo: props.setTo,
            setFrom: props.setFrom,
            currencyName: props.currencyName,
            setCurrencyName: props.setCurrencyName,
          }}
        />
      </div>

      {!filteredData.length && !sellingFilteredData.length && (
        <div
          style={{
            position: "absolute",
            top: "-70px",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <h1>No Data Found</h1>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
