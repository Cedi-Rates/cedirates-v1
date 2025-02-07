"use client";
import React from "react";
import moment from "moment";
import "moment-timezone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsCalculator, BsInfo } from "react-icons/bs";
import style from "../../assets/styles/fuelprices.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { fuelRatesType } from "@/utils/types";
import InfoTooltip from "../ui/info-tooltip";

moment.suppressDeprecationWarnings = true;

type Props = {
  rates: fuelRatesType[];
  setFuelPrices: React.Dispatch<React.SetStateAction<fuelRatesType[]>>;
  calculatorInput: number | string;
  setCalculatorInput: React.Dispatch<React.SetStateAction<number | string>>;
};

const Calculator = ({
  rates,
  setFuelPrices,
  calculatorInput,
  setCalculatorInput,
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
      setFuelPrices(
        rates.map((item) => {
          const { petrol, diesel, premium } = item;
          return {
            ...item,
            petrol: petrol ? petrol * parseInt(value as string) : petrol,
            diesel: diesel ? diesel * parseInt(value as string) : diesel,
            premium: premium ? premium * parseInt(value as string) : premium,
          };
        })
      );
    } else {
      // setCalculatorInput(value);
      setFuelPrices(rates);
    }
  };

  const handleReset = () => {
    setCalculatorInput("");
    setFuelPrices(rates);
  };

  return (
    <div>
      <div className="flex items-center justify-end lg:w-[450px] sm:w-[350px]">
        <div className="relative lg:w-[80%] w-[100%] flex place-items-center h-full">
          <span className="absolute text-[1.5rem] text-black/40 translate-x-1/2 left-1 top-1\2 ">
            <BsCalculator size={18} />
          </span>
          <input
            placeholder="Enter amount in litres"
            className="rounded-radius-md border-[1px] border-black/5 bg-white shadow-[0_2px_6px_#00000010] h-11 active:outline-none focus:outline-none px-10 text-base font-light w-[100%]"
            value={calculatorInput}
            onChange={handleChange}
            inputMode="decimal"
          />
          {calculatorInput ? (
            <span
              className="absolute bg-gray-400 text-white right-5 top-[15px] rounded-full cursor-pointer"
              onClick={handleReset}
            >
              <IoMdCloseCircle />
            </span>
          ) : (
            <InfoTooltip
              icon={<BsInfo />}
              content={
                <p>
                  Enter amount of litres in input field to show how much it
                  costs at every fuel station listed.
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
