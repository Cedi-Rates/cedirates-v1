import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DatePickerWithRange } from "./date-picker-tabs";

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

const FuelChartComponent: React.FC<ChartComponentProps> = (props) => {
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
      .map((label, index) => ({
        time: formatDate(parseDate(label)),
        value: parseFloat(state.datasets[0].data[index]),
      }))
      .filter((data, index) => {
        const petrolValue = parseFloat(state.datasets[0].data[index]);
        const dieselValue = parseFloat(state.datasets[1].data[index]);
        const premiumValue = parseFloat(state.datasets[1].data[index]);
        // Check if either buying or selling data is falsy for the current day
        if (!petrolValue) return false;

        if (!currentRange) return true;
        return (
          new Date(data.time) >= currentRange.from &&
          new Date(data.time) <= currentRange.to
        );
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [state, currentRange]);

  const dieselFilteredData = useMemo(() => {
    if (!state) return [];

    return state.labels
      .map((label, index) => ({
        time: formatDate(parseDate(label)),
        value: parseFloat(state.datasets[1].data[index]),
      }))
      .filter((data, index) => {
        const petrolValue = parseFloat(state.datasets[0].data[index]);
        const dieselValue = parseFloat(state.datasets[1].data[index]);
        const premiumValue = parseFloat(state.datasets[1].data[index]);
        // Check if either buying or selling data is falsy for the current day
        if (!dieselValue) return false;

        if (!currentRange) return true;
        return (
          new Date(data.time) >= currentRange.from &&
          new Date(data.time) <= currentRange.to
        );
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [state, currentRange]);

  const premiumFilteredData = useMemo(() => {
    if (!state) return [];

    return state.labels
      .map((label, index) => ({
        time: formatDate(parseDate(label)),
        value: parseFloat(state.datasets[2].data[index]),
      }))
      .filter((data, index) => {
        const petrolValue = parseFloat(state.datasets[0].data[index]);
        const dieselValue = parseFloat(state.datasets[1].data[index]);
        const premiumValue = parseFloat(state.datasets[1].data[index]);
        // Check if either buying or selling data is falsy for the current day
        if (!premiumValue) return false;

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
  const dieselSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const premiumSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);

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

    // Petrol series
    seriesRef.current = chartRef.current.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineType: 1,
      lineWidth: 4,
      priceFormat: {
        type: "custom",
        formatter: function (price: number) {
          return `₵${price.toFixed(2)}`;
        },
      },
    });
    seriesRef.current.setData(filteredData);

    // Diesel series
    dieselSeriesRef.current = chartRef.current.addAreaSeries({
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
    dieselSeriesRef.current.setData(dieselFilteredData);

    // Premium series
    premiumSeriesRef.current = chartRef.current.addAreaSeries({
      lineColor: "#a88f135b",
      topColor: "#ac9e333c",
      bottomColor: "#ac9a3347",
      lineType: 0,
      lineWidth: 4,
      priceFormat: {
        type: "custom",
        formatter: function (price: number) {
          return `₵${price.toFixed(2)}`;
        },
      },
    });
    premiumSeriesRef.current.setData(premiumFilteredData);

    chartRef.current.timeScale().fitContent();

    const handleCrosshairMove = (param: any) => {
      if (
        !tooltipRef.current ||
        !param.time ||
        !seriesRef.current ||
        !dieselSeriesRef.current ||
        !premiumSeriesRef.current ||
        !param.point
      ) {
        tooltipRef.current && (tooltipRef.current.style.display = "none");
        return;
      }

      const petrolData = param.seriesData.get(seriesRef.current);
      const dieselData = param.seriesData.get(dieselSeriesRef.current);
      const premiumData = param.seriesData.get(premiumSeriesRef.current);
      const petrolPrice = petrolData?.value ?? petrolData?.close ?? null;
      const dieselPrice = dieselData?.value ?? dieselData?.close ?? null;
      const premiumPrice = premiumData?.value ?? premiumData?.close ?? null;

      if (
        petrolPrice === null ||
        dieselPrice === null ||
        premiumPrice === null
      ) {
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
    <div style="color: #2962FF">Petrol: ₵${(
      Math.round(petrolPrice * 100) / 100
    ).toFixed(2)}</div>
    <div style="color: #33ac64;white-space:nowrap;">Diesel: ₵${(
      Math.round(dieselPrice * 100) / 100
    ).toFixed(2)}</div>
    <div style="color: #aca033;white-space:nowrap;">Premium: ₵${(
      Math.round(premiumPrice * 100) / 100
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
    dieselFilteredData,
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
          zIndex: 1000,
        }}
      />

<div
       className="absolute top-[-110px] w-full flex flex-col sm:flex-row justify-between items-start sm:items-center z-2"
      >
        <p className="text-paragraph-lg-semibold mt-6">Fuel Price Tracker</p>
        <div className="flex flex-row">
        <DatePickerWithRange onChange={handleDateChange} />
        {/* <CurrencyPicker /> */}
        </div>
        </div>

      {!filteredData.length &&
        !dieselFilteredData.length &&
        !premiumFilteredData && (
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

export default FuelChartComponent;
