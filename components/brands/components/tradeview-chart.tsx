import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DatePickerWithRange } from "./date-picker-tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { CurrencyPicker } from "@/utils/currency-picker";

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

  const handleDateChange = (range: { from: Date; to: Date } | undefined) => {
    setCurrentRange(range);
  };

  const filteredData = useMemo(() => {
    if (!state) return [];

    return state.labels
      .map((label, index) => {
        const buyingValue = parseFloat(state.datasets[0].data[index]);
        return {
          time: formatDate(parseDate(label)),
          value: buyingValue,
        };
      })
      .filter((data, index) => {
        const buyingValue = parseFloat(state.datasets[0].data[index]);
        const sellingValue = parseFloat(state.datasets[1].data[index]);

        // Check if either buying or selling data is falsy for the current day
        if (!buyingValue) return false;

        if (!currentRange) return true;

        return (
          new Date(data.time) >= currentRange.from &&
          new Date(data.time) <= currentRange.to
        );
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [state, currentRange]);

  const sellingFilteredData = useMemo(() => {
    if (!state) return [];

    return state.labels
      .map((label, index) => {
        const sellingValue = parseFloat(state.datasets[1].data[index]);
        return {
          time: formatDate(parseDate(label)),
          value: sellingValue,
        };
      })
      .filter((data, index) => {
        const buyingValue = parseFloat(state.datasets[0].data[index]);
        const sellingValue = parseFloat(state.datasets[1].data[index]);

        // Check if either buying or selling data is falsy for the current day
        if (!sellingValue) return false;

        if (!currentRange) return true;

        return (
          new Date(data.time) >= currentRange.from &&
          new Date(data.time) <= currentRange.to
        );
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [state, currentRange]);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const sellingSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);

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
          return `₵${price.toFixed(2)}`;
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
          return `₵${price.toFixed(2)}`;
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
      <div style="color: #292929; margin-bottom:5px; white-space:nowrap;">${formattedTime}</div>
      <div style="color: #2962FF; white-space:nowrap;">Buying: ₵${(
        Math.round(buyingPrice * 100) / 100
      ).toFixed(2)}</div>
      <div style="color: #069a41;white-space:nowrap;">Selling: ₵${(
        Math.round(sellingPrice * 100) / 100
      ).toFixed(2)}</div>
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

  // if (!filteredData.length && !sellingFilteredData.length) {
  //   return (
  //     <div style={{ marginTop: "20px" }}>
  //       <DatePickerWithRange onChange={handleDateChange} />
  //       <EmptyState message="No data available for the selected date range. Try adjusting the filter." />
  //     </div>
  //   );
  // }

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
        className="relative w-full h-[300px] z-[1] sm:top-0 top-20"
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
          zIndex: 3,
        }}
      />
      <div className="absolute top-[-110px] w-full flex flex-col sm:flex-row justify-between items-start sm:items-center z-2">
        <p className="text-paragraph-lg-semibold mt-6">Exchange Rate Tracker</p>
        <div className="flex flex-col sm:flex-row">
        <DatePickerWithRange onChange={handleDateChange} />
        <CurrencyPicker />
        </div>
      </div>{" "}
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
