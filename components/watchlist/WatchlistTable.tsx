"use client";
import React, { useEffect, useState } from "react";
import {
  UserDetailsType,
  exchangeRatesType,
  fuelRatesType,
} from "@/utils/types";

import DisplayAd from "../home/components/displayAd";
import ExchangeTable from "./ExchangeTableWatchList";
import FuelTable from "./FuelTableWatchList";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import EmptyStateTable from "./EmptyStateTable";

type Props = {
  rates: exchangeRatesType[];
  fuelPrices?: fuelRatesType[];
  user: UserDetailsType | null;
  categoryHeading?: string;
};

const WatchListTable = ({ rates, user, fuelPrices }: Props) => {
  const uniqueID = user?.UniqueID || "";
  const router = useRouter();

  const initialExchangeRatesWatchList = rates
    ? rates.filter((item) =>
        user?.watchList?.includes(item?.company?.UniqueID as string)
      )
    : [];

  const initialFuelPricesWatchList = fuelPrices
    ? fuelPrices.filter((item) =>
        user?.watchList?.includes(item?.company?.UniqueID as string)
      )
    : [];

  const [exchangeRatesWatchList, setExchangeRatesWatchList] = useState(
    initialExchangeRatesWatchList
  );

  const [fuelPricesWatchList, setFuelPricesWatchList] = useState(
    initialFuelPricesWatchList
  );
  // const [exchangeRatesWatchList, setExchangeRatesWatchList] = useState<
  //   exchangeRatesType[] | any
  // >([]);
  // const [fuelPricesWatchList, setFuelPricesWatchList] = useState<
  //   fuelRatesType[] | any
  // >([]);

  const currentValue = exchangeRatesWatchList.length < 1 ? "fuel" : "rates";

  const [selectValue, setSelectValue] = useState(currentValue);

  useEffect(() => {
    if (!uniqueID) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setExchangeRatesWatchList(initialExchangeRatesWatchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates]);

  useEffect(() => {
    setFuelPricesWatchList(initialFuelPricesWatchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelPrices]);

  // const newWatchList = (list: exchangeRatesType[] | fuelRatesType[]) => {
  //   const newList = list.filter((item) =>
  //     user?.watchList.includes(item?.company?.UniqueID as string)
  //   );

  //   return newList;
  // };

  // useEffect(() => {
  //   const newArray = newWatchList(rates);

  //   setExchangeRatesWatchList(newArray);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rates]);

  // useEffect(() => {
  //   if (fuelPrices) {
  //     const newArray = newWatchList(fuelPrices);

  //     setFuelPricesWatchList(newArray);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fuelPrices]);

  const onValueChangeFunc = (value: string) => {
    setSelectValue(value);
    // router.push("/watchlist"); // Reset the URL to /watchlist
    window.history.pushState(null, "", "/watchlist");
  };

  if (
    uniqueID &&
    exchangeRatesWatchList.length < 1 &&
    fuelPricesWatchList.length < 1
  ) {
    return <EmptyStateTable />;
  }

  return (
    <div className="px-spacing-16 gap-spacing-24 lg:px-spacing-96 pb-spacing-32 lg:pb-spacing-64 lg:gap-spacing-32 mt-6">
      <DisplayAd position="top" />
      <div className="mb-5 flex flex-col-reverse items-end justify-between lg:flex-row">
        <div className="">
          <h1 className="text-xl md:text-[25px] md:leading-[32.5px] font-semibold mb-3 md:mb-4">
            Create Your Cedirates Watchlist Today
          </h1>
          <p
            className={`text-[14px] leading-[18px] text-start tracking-normal fill-[#58667e] text-[#58667e] "mb-3" lg:max-w-[80%]`}
          >
            Track exchange rates and fuel prices with a personalized watchlist.
            Monitor targets from banks, online processors, remittance services,
            forex bureaus, and other trusted sources.
          </p>
        </div>
        <div className="mb-5 lg:m-0">
          <Select
            onValueChange={(value) => onValueChangeFunc(value)}
            defaultValue={selectValue}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Rates type</SelectLabel> */}
                <SelectItem value="rates">Exchange Rates</SelectItem>
                <SelectItem value="fuel">Fuel Prices</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectValue === "rates" ? (
        <ExchangeTable rates={exchangeRatesWatchList} user={user} />
      ) : (
        <FuelTable rates={fuelPricesWatchList} user={user} />
      )}
    </div>
  );
};

export default WatchListTable;
