"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DateRange {
  from: Date;
  to: Date;
}

interface DatePickerWithRangeProps {
  onChange: (range: DateRange) => void;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  onChange,
}) => {
  const [dateRange, setDateRange] = useState<string>("30d");

  const getDateRange = (range: string): DateRange => {
    const now = new Date();
    switch (range) {
      case "7d":
        return {
          from: new Date(now.setDate(now.getDate() - 7)),
          to: new Date(),
        };
      case "30d":
        return {
          from: new Date(now.setDate(now.getDate() - 30)),
          to: new Date(),
        };
      case "90d":
        return {
          from: new Date(now.setDate(now.getDate() - 90)),
          to: new Date(),
        };
      case "6m":
        return {
          from: new Date(now.setMonth(now.getMonth() - 6)),
          to: new Date(),
        };
      case "1y":
        return {
          from: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
          to: new Date(),
        };
      case "ytd":
        return {
          from: new Date(now.setFullYear(now.getFullYear(), 0, 1)),
          to: new Date(),
        };
      case "all":
        return {
          from: new Date(0),
          to: new Date(),
        };
      default:
        return {
          from: new Date(now.setDate(now.getDate() - 90)),
          to: new Date(),
        };
    }
  };

  useEffect(() => {
    if (dateRange) {
      const range = getDateRange(dateRange);
      onChange(range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const handleTabChange = (range: string) => {
    setDateRange(range);
  };

  return (
    <Tabs
      value={dateRange}
      onValueChange={handleTabChange}
      className="mt-4 mr-2"
    >
      <TabsList className="flex justify-center space-x-0.5 rounded-lg">
        <TabsTrigger className="rounded-md !px-1.5" value="7d">
          7 days
        </TabsTrigger>
        <TabsTrigger className="rounded-md !px-1.5" value="30d">
          1 month
        </TabsTrigger>
        <TabsTrigger className="rounded-md !px-1.5" value="1y">
          1 year
        </TabsTrigger>
        <TabsTrigger className="rounded-md !px-1.5" value="all">
          All
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
