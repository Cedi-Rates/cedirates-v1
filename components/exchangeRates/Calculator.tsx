"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";
import { BsCalculator, BsInfo } from "react-icons/bs";
import style from "../../assets/styles/fuelprices.module.css";
import style1 from "../../assets/styles/exchangerates.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { exchangeRatesType } from "@/utils/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InfoTooltip from "../ui/info-tooltip";

moment.suppressDeprecationWarnings = true;

type Props = {
  rates: exchangeRatesType[];
  setExchangeRates: React.Dispatch<React.SetStateAction<exchangeRatesType[]>>;
  calculatorInput: number | string;
  setCalculatorInput: React.Dispatch<React.SetStateAction<number | string>>;
  setActiveSubcategory: React.Dispatch<React.SetStateAction<string>>;
  currencyType: "dollarRates" | "euroRates" | "poundRates";
  currency?: string;
};

const subCategories = [
  {
    name: "All",
    value: "",
    link: `/exchangerates`,
  },
  {
    name: "Banks",
    value: "Commercial Bank Central Bank",
    link: `/exchangerates/banks`,
  },
  {
    name: "Forex Bureaus",
    value: "Forex Bureau",
    link: `/exchangerates/forex-bureaus`,
  },
  {
    name: "Online Payments",
    value: "Payment Processor",
    link: `/exchangerates/online-payments`,
  },
  {
    name: "Remittance",
    value: "Money Transfer",
    link: `/exchangerates/remittance`,
  },
  {
    name: "Crypto",
    value: "Crypto Exchange",
    link: `/exchangerates/crypto`,
  },
  {
    name: "Fintechs",
    value: "Fintech",
    link: `/exchangerates/fintech`,
  },
];

const Calculator = ({
  rates,
  setExchangeRates,
  calculatorInput,
  setCalculatorInput,
  currencyType,
}: Props) => {
  const formatNumberWithCommas = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const numericValue = parseInt(value);

    if (value === "") {
      handleReset();
      return;
    };

    if (!isNaN(numericValue) && numericValue > 0) {
      setCalculatorInput(formatNumberWithCommas(value));
      setExchangeRates(
        rates.map((item) => {
          return {
            ...item,
            company: item.company,
            dollarRates: {
              ...item.dollarRates,
              buyingRate: item?.dollarRates?.buyingRate
                ? item?.dollarRates?.buyingRate * parseInt(value as string)
                : item?.dollarRates?.buyingRate,
              sellingRate: item?.dollarRates?.sellingRate
                ? item?.dollarRates?.sellingRate * parseInt(value as string)
                : item?.dollarRates?.sellingRate,
              midRate: item?.dollarRates?.midRate
                ? item?.dollarRates?.midRate * parseInt(value as string)
                : item?.dollarRates?.midRate,
            },
            euroRates: {
              ...item.euroRates,
              buyingRate: item?.euroRates?.buyingRate
                ? item?.euroRates?.buyingRate * parseInt(value as string)
                : item?.euroRates?.buyingRate,
              sellingRate: item?.euroRates?.sellingRate
                ? item?.euroRates?.sellingRate * parseInt(value as string)
                : item?.euroRates?.sellingRate,
              midRate: item?.euroRates?.midRate
                ? item?.euroRates?.midRate * parseInt(value as string)
                : item?.euroRates?.midRate,
            },
            poundRates: {
              ...item.poundRates,
              buyingRate: item?.poundRates?.buyingRate
                ? item?.poundRates?.buyingRate * parseInt(value as string)
                : item?.poundRates?.buyingRate,
              sellingRate: item?.poundRates?.sellingRate
                ? item?.poundRates?.sellingRate * parseInt(value as string)
                : item?.poundRates?.sellingRate,
              midRate: item?.poundRates?.midRate
                ? item?.poundRates?.midRate * parseInt(value as string)
                : item?.poundRates?.midRate,
            },
          };
        })
      );
    } else {
      setExchangeRates(rates);
    }
  };

  const handleReset = () => {
    setCalculatorInput("");
    setExchangeRates(rates);
  };

  return (
    <div>
      <div className="flex items-center justify-end lg:w-[450px] sm:w-[350px]">
        <div className="relative lg:w-[80%] w-[100%] flex place-items-center h-full">
          <span className="absolute text-[1.5rem] text-black/40 translate-x-1/2 left-1 top-1\2 ">
            <BsCalculator size={18} />
          </span>
          <input
            type="tel"
            placeholder={`Enter amount in ${currencyType === "dollarRates"
              ? "US Dollars"
              : currencyType === "euroRates"
                ? "EUR"
                : "GBP"
              }`}
            className="rounded-radius-md border-[1px] border-black/5 bg-white shadow-[0_2px_6px_#00000010] h-11 active:outline-none focus:outline-none px-10 text-base font-light w-[100%]"
            value={calculatorInput}
            onChange={handleChange}
            inputMode="decimal"
          />
          {calculatorInput ? (
            <span
              className="absolute bg-black/60 text-white right-5 top-[15px] rounded-full cursor-pointer"
              onClick={handleReset}
            >
              <IoMdCloseCircle />
            </span>
          ) : (
            <InfoTooltip
              content={
                <p>
                  Use advanced{" "}
                  <Link
                    href="/currency-converter"
                    className="text-primary underline"
                  >
                    Currency Converter
                  </Link>{" "}
                  to check for any currency.
                </p>
              }
            />
          )}
        </div>

        {/* <div className="lg:flex hidden items-center space-x-4 px-3 h-11 text-sm  text-[#818181] w-[20%]">
          <span className="font-gellix-light text-nowrap">
            {moment().format("DD MMM YYYY")}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Calculator;
