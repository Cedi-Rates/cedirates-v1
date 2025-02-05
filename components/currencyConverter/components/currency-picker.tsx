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

interface CurrencyPickerProps {
  currencyObj: {
    to: any;
    setTo: any;
    from: any;
    setFrom: any;
    currencyName: any;
    setCurrencyName: any;
  };
}

const currencyObjectArray = [
  {
    shortName: "usd",
    fullName: "US Dollar",
    plural: "US Dollars",
    sign: "$",
    emoji: "🇺🇸",
    slug: "dollar",
  },
  {
    shortName: "gbp",
    fullName: "British Pound",
    plural: "British Pounds",
    sign: "£",
    emoji: "🇬🇧",
    slug: "pound",
  },
  {
    shortName: "eur",
    fullName: "Euro",
    plural: "Euros",
    sign: "€",
    emoji: "🇪🇺",
    slug: "euro",
  },
];

export const CurrencyPicker: React.FC<CurrencyPickerProps> = ({
  currencyObj,
}) => {
  const { from, to, setFrom, setTo, currencyName, setCurrencyName } =
    currencyObj;
  // const [currencyName, setCurrencyName] = useState<string>(
  //   // to.shortName === "ghs" ? from.shortName : to.shortName
  //   "default"
  // );

  switch (currencyName) {
    case "usd":
      if (to.shortName === "ghs") setFrom(currencyObjectArray[0]);
      else if (from.shortName === "ghs") setTo(currencyObjectArray[0]);
      break;
    case "gbp":
      if (to.shortName === "ghs") setFrom(currencyObjectArray[1]);
      else if (from.shortName === "ghs") setTo(currencyObjectArray[1]);
      break;
    case "eur":
      if (to.shortName === "ghs") setFrom(currencyObjectArray[2]);
      else if (from.shortName === "ghs") setTo(currencyObjectArray[2]);
      break;

    default:
      break;
  }

  // useEffect(() => {
  //   setCurrencyName("default");
  // }, [currencyName]);

  // console.log(currencyName);
  // console.log(currencyName);

  return (
    <div className="flex flex-col items-center gap-y-4 mt-4 ">
      <Select
        value={currencyName}
        onValueChange={(value) => {
          setCurrencyName(value);
        }}
        // className=" bg-black/5"
      >
        <SelectTrigger
          className="w-[160px] rounded-lg sm:ml-auto"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Select a range" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="default" className="rounded-lg">
            Select a currency
          </SelectItem>
          <SelectItem value="usd" className="rounded-lg">
            Dollar
          </SelectItem>
          <SelectItem value="gbp" className="rounded-lg">
            Pound
          </SelectItem>
          <SelectItem value="eur" className="rounded-lg">
            Euro
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
