"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabContext } from "@/components/brands/RatesSection";

export const CurrencyPicker = () => {
  // const [currencyName, setCurrencyName] = useState<string>(
  //   // to.shortName === "ghs" ? from.shortName : to.shortName
  //   "default"
  // );
  // const { setSelectedTab } = useContext(TabContext);
  const context = useContext(TabContext);
  const selectedTab = context?.selectedTab || "dollarRates";
  const setSelectedTab = context?.setSelectedTab;

  // useEffect(() => {
  //   setCurrencyName("default");
  // }, [currencyName]);

  // console.log(currencyName);
  // console.log(currencyName);

  const onValueChangeFunc = (value: string) => {
    if (setSelectedTab) setSelectedTab(value);
  };

  return (
    <div className="flex flex-col items-start sm:items-center gap-y-4 mt-4">
      <Select
        value={selectedTab}
        onValueChange={(value) => onValueChangeFunc(value)}
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
          <SelectItem value="dollarRates" className="rounded-lg">
            Dollar
          </SelectItem>
          <SelectItem value="poundRates" className="rounded-lg">
            Pound
          </SelectItem>
          <SelectItem value="euroRates" className="rounded-lg">
            Euro
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
