// Form.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { BiTransferAlt } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import {
  addCommasToNumber,
  currencies,
  convertCurrency,
} from "@/utils/currencyConverterFunc";
import styles from "@/assets/styles/currencyConverter.module.css";

moment.suppressDeprecationWarnings = true;

interface Props {
  isClosed: any;
  amount: any;
  addCommasAndSave: any;
  amountWithCommas: any;
  setAmount: any;
  setAmountWithCommas: any;
  from: any; // Adjust the type as per your 'currencies' data structure
  setFrom: any;
  to: any; // Adjust the type as per your 'currencies' data structure
  setTo: any;
  ERD: any;
  priceRef: any;
  onSubmit: any;
  finalPrice: any;
  isTablet: any;
  setCurrencyName: any;
}

const Form: React.FC<Props> = ({
  isClosed,
  ERD,
  amount,
  finalPrice,
  amountWithCommas,
  addCommasAndSave,
  from,
  setFrom,
  to,
  setTo,
  onSubmit,
  priceRef,
  isTablet,
  setCurrencyName,
}) => {
  return (
    <div className={styles.div3}>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div>
          <div className="grid w-full flex-[100%] items-center gap-1.5">
            <Label htmlFor="email" className="font-semibold">
              Amount
            </Label>
            <Input
              required
              onChange={(element) => addCommasAndSave(element)}
              value={amountWithCommas}
              inputMode="decimal"
              className="max-w-none"
            />
          </div>
          <div className="w-full flex flex-row gap-[10px] items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="font-semibold">
                From
              </Label>
              <Select
                value={from.shortName}
                onValueChange={(value) => {
                  setCurrencyName(
                    currencies.find((s) => s.shortName === value)?.shortName
                  );
                  setFrom(currencies.find((s) => s.shortName === value));
                }}
              >
                <SelectTrigger className="w-full font-medium">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {currencies.map((item, index) => {
                      return (
                        <SelectItem
                          className="font-medium"
                          value={item.shortName}
                          key={index}
                        >
                          {item.emoji} {item.shortName.toUpperCase()}
                          {!isTablet && ` - ${item.fullName}`}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                let toTemp = to;
                let fromTemp = from;
                setTo(fromTemp);
                setFrom(toTemp);
              }}
              className="rounded-[999px] mt-4 aspect-square px-0"
            >
              <BiTransferAlt color="#1697FD" size={24} />
            </Button>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="font-semibold">
                To
              </Label>
              <Select
                value={to.shortName}
                onValueChange={(value) => {
                  setCurrencyName(
                    currencies.find((s) => s.shortName === value)?.shortName
                  );
                  setTo(currencies.find((s) => s.shortName === value));
                }}
              >
                <SelectTrigger className="w-full font-medium">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {currencies.map((item, index) => {
                      return (
                        <SelectItem
                          className="font-medium"
                          value={item.shortName}
                          key={index}
                        >
                          {item.emoji} {item.shortName.toUpperCase()}
                          {!isTablet && ` - ${item.fullName}`}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isClosed && (
          <Button
            className="text-white w-full sm:w-auto font-semibold"
            type="submit"
          >
            Convert
          </Button>
        )}
      </form>
      <div
        className="priceDiv flex flex-col min-[600px]:gap-0 gap-4"
        ref={priceRef}
      >
        {!isClosed && (
          <div className="flex flex-col gap-3 min-[600px]:items-start items-center">
            <p className="text-[16px] text-[#5c667b] mb-[-14px] font-semibold">
              {addCommasToNumber(amount)}{" "}
              {Number(amount) > 1 ? from.plural : from.fullName} =
            </p>
            {/* <Skeleton> */}
            <h1 className="text-[48px] min-[600px]:text-start text-center leading-[50px] font-semibold">
              {finalPrice === "-"
                ? "Unsupported Conversion"
                : `${addCommasToNumber(finalPrice)} ${
                    amount > 1 ? to.plural : to.fullName
                  }`}
            </h1>
            {/* </Skeleton> */}
            <p className="text-[16px] text-[#5c667b] mt-[-6px] font-medium">
              1 {from.shortName.toUpperCase()} ={" "}
              {convertCurrency(1, from, to, ERD)} {to.shortName.toUpperCase()}
            </p>
          </div>
        )}
        {!isClosed && (
          <div className="w-full flex flex-col min-[600px]:items-end items-center gap-1 justify-end">
            <div className="flex min-[600px]:w-auto w-full sm:gap-3 gap-2 min-[600px]:flex-row flex-col">
              <Button
                onClick={() => window.open("/signup", "_self")}
                className="font-semibold text-white sm:w-auto w-full"
              >
                Get rate alerts
              </Button>
              <Button
                onClick={() => window.open("/exchangerates", "_self")}
                variant="outline"
                className="border-2 border-blue-300 sm:w-auto w-full text-blue-500 hover:text-blue-500 font-semibold"
              >
                Compare Exchange Rates
              </Button>
            </div>
            <p className="font-medium">
              Last updated{" "}
              <span className="text-blue-500">{moment().calendar()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
