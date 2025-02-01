import React, { useMemo, useState } from "react";
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
  onDateChange: (range: { from: Date; to: Date } | undefined) => void;
};

interface ChartData {
  date: string;
  Petrol: number;
  Diesel: number;
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
  Petrol: {
    label: "Petrol",
  },
  Diesel: {
    label: "Diesel",
  },
  Premium: {
    label: "Premium",
  },
} satisfies ChartConfig;

const Chart: React.FC<Props> = ({ state }) => {
  // const [filteredData, setFilteredData] = useState<ChartData[]>([]);
  const [currentRange, setCurrentRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);

  const handleDateChange = (range: { from: Date; to: Date } | undefined) => {
    setCurrentRange(range);
  };

  // Filtered data using memoization for performance
  const filteredData = useMemo(() => {
    if (!state || !currentRange) return [];

    const { from, to } = currentRange;

    return state.labels
      .map((label, index) => ({
        date: parseDate(label),
        Petrol: parseFloat(state.datasets[0].data[index]),
        Diesel: parseFloat(state.datasets[1].data[index]),
        Premium: parseFloat(state.datasets[2].data[index]),
      }))
      .filter((data) => data.date >= from && data.date <= to)
      .map((el) => ({
        date: el.date,
        Petrol: Number.isNaN(el.Petrol) ? undefined : el.Petrol,
        Diesel: Number.isNaN(el.Diesel) ? undefined : el.Diesel,
        Premium: Number.isNaN(el.Premium) ? undefined : el.Premium,
      }))
      .map((data) => ({
        ...data,
        date: formatDate(data.date),
      }));
  }, [state, currentRange]);

  const minVal = Math.min(
    ...filteredData
      .map((d) =>
        Math.min(
          d.Petrol ?? Infinity,
          d.Diesel ?? Infinity,
          d.Premium ?? Infinity
        )
      )
      .filter((val) => val !== Infinity)
  );

  const minYValue = minVal === 0 ? 0 : minVal - 0.5;

  const maxYValue =
    Math.max(
      ...filteredData
        .map((d) =>
          Math.max(
            d.Petrol ?? -Infinity,
            d.Diesel ?? -Infinity,
            d.Petrol ?? -Infinity
          )
        )
        .filter((val) => val !== -Infinity)
    ) + 0.5;

  return (
    <div className="px-[10px] sm:px-[20px] md:px-[30px] lg:px-[35px] xl:px-0">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Fuel Price Chart</CardTitle>
            <CardDescription>Petrol and Diesel Data</CardDescription>
          </div>
          <DatePickerWithRange onChange={handleDateChange} />
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart accessibilityLayer data={filteredData}>
              <defs>
                {" "}
                <linearGradient id="fillPremium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffca44" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffca44" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillPetrol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1896fe" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1896fe" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillDiesel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#009c65" stopOpacity={0.8} />
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
                dataKey="Premium"
                type="monotone"
                fill="url(#fillPremium)"
                stroke="#ffca44"
                stackId="1"
              />
              <Area
                dataKey="Diesel"
                type="monotone"
                fill="url(#fillDiesel)"
                stroke="#009c65"
                stackId="2"
              />
              <Area
                dataKey="Petrol"
                type="monotone"
                fill="url(#fillPetrol)"
                stroke="#1896fe"
                stackId="3"
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
