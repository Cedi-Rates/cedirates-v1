import React, { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePickerWithRange } from "./date-picker";

type Props = {
  state: {
    labels: string[];
    datasets: {
      label: string;
      data: string[];
    }[];
  };
  to: any;
  from: any;
  onDateChange: (range: { from: Date; to: Date } | undefined) => void;
};

interface ChartData {
  date: string;
  Buying: number;
  Selling: number;
}

const formatDate = (date: Date): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yyyy = date.getFullYear();
  const mm = monthNames[date.getMonth()];
  const dd = String(date.getDate()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}`;
};

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const chartConfig = {
  Buying: {
    label: "Buying",
  },
  Selling: {
    label: "Selling",
  },
} satisfies ChartConfig;

const Chart: React.FC<Props> = ({ state, to, from }) => {
  // const [filteredData, setFilteredData] = useState<ChartData[]>([]);
  const [currentRange, setCurrentRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);
  const [currenctCurrency, setCurrentCurrency] = useState("");

  const now = new Date();
  const defaultRange = {
    from: new Date(now.setDate(now.getDate() - 30)),
    to: new Date(),
  };

  const handleDateChange = (range: { from: Date; to: Date } | undefined) => {
    setCurrentRange(range);
  };

  const filteredData = useMemo(() => {
    if (!state || !currentRange) return [];

    const { from, to } = currentRange;

    return state.labels
      .map((label, index) => ({
        date: parseDate(label),
        Buying: parseFloat(state.datasets[0].data[index]),
        Selling: parseFloat(state.datasets[1].data[index]),
      }))
      .filter((data) => data.date >= from && data.date <= to)
      .map((el) => ({
        date: el.date,
        Buying: Number.isNaN(el.Buying) ? undefined : el.Buying,
        Selling: Number.isNaN(el.Selling) ? undefined : el.Selling,
      }))
      .map((data) => ({
        ...data,
        date: formatDate(data.date),
      }));
  }, [state, currentRange]);

  const minYValue =
    Math.min(
      ...filteredData
        .map((d) => Math.min(d.Buying ?? Infinity, d.Selling ?? Infinity))
        .filter((val) => val !== Infinity)
    ) - 0.5;

  const maxYValue =
    Math.max(
      ...filteredData
        .map((d) => Math.max(d.Buying ?? -Infinity, d.Selling ?? -Infinity))
        .filter((val) => val !== -Infinity)
    ) + 0.5;

  useEffect(() => {
    if (to.shortName === "ghs") {
      setCurrentCurrency(
        `${from.slug.charAt(0).toUpperCase()}${from.slug.slice(1)}`
      );
    } else {
      setCurrentCurrency(
        `${to.slug.charAt(0).toUpperCase()}${to.slug.slice(1)}`
      );
    }
  }, [to, from]);

  return (
    <div className="px-[10px] sm:px-[20px] md:px-[30px] lg:px-[35px] xl:px-0">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle className="font-bold">
              {currenctCurrency} Rates Chart
            </CardTitle>
            <CardDescription>Buying and Selling Data</CardDescription>
          </div>
          <DatePickerWithRange onChange={handleDateChange} />
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={filteredData}
              // margin={{
              //   left: -10,
              //   right: -30,
              // }}
            >
              <defs>
                <linearGradient id="fillBuying" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1896fe" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#1896fe" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillSelling" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#009c65" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#009c65" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                type="number"
                allowDataOverflow={true}
                tickLine={false}
                axisLine={false}
                domain={[minYValue, maxYValue]}
                tickCount={5}
                tickFormatter={(value) => {
                  return `${value.toFixed(2)}`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="Buying"
                type="monotone"
                fill="url(#fillBuying)"
                stroke="#1896fe"
                stackId="a"
              />
              <Area
                dataKey="Selling"
                type="monotone"
                fill="url(#fillSelling)"
                stroke="#009c65"
                stackId="b"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
