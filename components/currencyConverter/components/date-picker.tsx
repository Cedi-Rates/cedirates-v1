"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <div className="flex flex-col items-center gap-y-4">
      <Select
        value={dateRange}
        onValueChange={(value) => {
          setDateRange(value);
        }}
      >
        <SelectTrigger
          className="w-[160px] rounded-lg sm:ml-auto"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Select a range" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all" className="rounded-lg">
            All
          </SelectItem>
          <SelectItem value="ytd" className="rounded-lg">
            Year to date
          </SelectItem>
          <SelectItem value="1y" className="rounded-lg">
            Last 12 months
          </SelectItem>
          <SelectItem value="6m" className="rounded-lg">
            Last 6 months
          </SelectItem>
          <SelectItem value="90d" className="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
