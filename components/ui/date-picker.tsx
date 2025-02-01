"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  selected?: any;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ selected, onSelect, className, ...props }, ref) => {
    const [date, setDate] = React.useState<Date | undefined>(selected);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
      if (selected) {
        setDate(new Date(selected)); // Convert to Date object
      }
    }, [selected]);

    const handleDateSelect = (newDate: Date | undefined) => {
      if (newDate && !(newDate instanceof Date)) {
        newDate = new Date(newDate); // Ensure Date object
      }
      setDate(newDate);
      if (onSelect) {
        onSelect(newDate);
      }
      setIsOpen(false); // Close the popover
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <input
              type="text"
              readOnly
              value={date ? format(date, "PPP") : ""}
              placeholder="Pick a date"
              className={cn(
                "w-full px-10 py-2 text-left font-normal border rounded-md",
                !date && "text-muted-foreground",
                className
              )}
              ref={ref}
              {...props}
            />
            <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            // initialFocus
            captionLayout="dropdown"
            // required
            fromYear={1950}
            toYear={2020}
            // fixedWeeks
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            defaultMonth={date}
            month={date}
            onMonthChange={setDate}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
