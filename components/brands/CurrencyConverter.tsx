"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import {
  CompanyRate,
  CompleteRateType,
  currencyRatesType,
} from "@/utils/types";
import { useToast } from "../ui/use-toast";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import {
  getAvailableCurrencies,
  addCommasToNumber,
  getValidCurrencyPairs,
} from "@/utils/currencyConverterFunc";

type Props = {
  companyData: CompanyRate;
  className?: string;
};

const MAX_VALUE = 1e15;

const sanitizeInput = (value: string) => {
  return value.replace(/[^0-9.eE+-]/g, "");
};

const getCurrencyFlag = (currency: string): string => {
  const flagMap: Record<string, string> = {
    USD: "us",
    GHS: "gh",
    GBP: "gb",
    EUR: "eu",
  };
  return flagMap[currency] || "";
};

export default function CurrencyConverter({ companyData, className }: Props) {
  const [amount1, setAmount1] = React.useState<string | number>("500.00");
  const [amount2, setAmount2] = React.useState<string | number>("0.00");
  const [currency1, setCurrency1] = React.useState("USD");
  const [currency2, setCurrency2] = React.useState("GHS");
  const [isTypingInAmount1, setIsTypingInAmount1] = React.useState(true);
  // General typing
  const [isTyping, setIsTyping] = React.useState(false);
  const [isTyping2, setIsTyping2] = React.useState(false);
  const [currentRate, setCurrentRate] = React.useState<{
    from: string;
    to: string;
    rate: number;
  }>({
    from: "",
    to: "",
    rate: 0,
  });

  const formatAmount = (amount: string | number, currency: string) => {
    if (!amount) return ""; // If empty, return nothing
    return isTyping ? amount : `${symbolMap[currency]}${amount}`;
  };

  const formatAmount2 = (amount: string | number, currency: string) => {
    if (!amount) return ""; // If empty, return nothing
    return isTyping2 ? amount : `${symbolMap[currency]}${amount}`;
  };

  const { toast } = useToast();

  const symbolMap: Record<string, string> = {
    USD: "$",
    GHS: "₵",
    GBP: "£",
    EUR: "€",
  };

  const formatRateDisplay = (from: string, to: string, rate: number) => {
    if (from === "GHS") {
      // GHS to other currency: ₵1 = $0.xx
      return `₵1 = ${symbolMap[to]}${rate.toFixed(2)}`;
    } else if (to === "GHS") {
      // Other currency to GHS: $1 = ₵xx.xx
      return `₵1 = ${symbolMap[from]}${rate.toFixed(2)}`;
    }
    return ""; // Handle other cases if needed
  };

  const handleSwap = () => {
    setAmount1(amount2);
    setAmount2(amount1);
    setCurrency1(currency2);
    setCurrency2(currency1);
    setIsTypingInAmount1(!isTypingInAmount1);

    convertCurrency(parseFloat(amount1 as string), currency2, currency1);
  };

  const isConversionSupported = (from: string, to: string) => {
    const validPairs = getValidCurrencyPairs(companyData);
    return validPairs.has(`${from}/${to}`);
  };

  const convertCurrency = (amount: number, from: string, to: string) => {
    const rates = companyData.data;
    let fromSlug = from;
    let toSlug = to;
    let toCurrency = "";
    let fromCurrency = "";

    let convertedAmount: number | string = "";

    if (!isConversionSupported(from, to)) {
      if (isConversionSupported(to, from)) {
        setCurrency1(to);
        setCurrency2(from);
        // convertCurrency(amount, to, from);
        fromSlug = from;
        toSlug = to;
        // return "";
      } else {
        // toast({
        //   variant: "destructive",
        //   title: `Exchange rate data not available for ${fromSlug}/${toSlug}`,
        //   description: "This currency pair is not supported by this company.",
        // });

        setCurrency1("GHS");
      }
    }

    switch (fromSlug) {
      case "USD":
        fromCurrency = "dollar";
        break;
      case "EUR":
        fromCurrency = "euro";
        break;
      case "GBP":
        fromCurrency = "pound";
        break;
      default:
        break;
    }

    switch (toSlug) {
      case "USD":
        toCurrency = "dollar";
        break;
      case "EUR":
        toCurrency = "euro";
        break;
      case "GBP":
        toCurrency = "pound";
        break;
      default:
        break;
    }

    const key1 = `${toCurrency}Rates` as keyof CompleteRateType;
    const rates1 = rates[key1] as currencyRatesType;

    const key2 = `${fromCurrency}Rates` as keyof CompleteRateType;
    const rates2 = rates[key2] as currencyRatesType;

    if (isTypingInAmount1) {
      if (fromSlug === "GHS" && amount && rates1?.sellingRate) {
        setCurrentRate({
          from: fromSlug,
          to: toSlug,
          rate: rates1?.sellingRate,
        });
        // ✅ GHS → Foreign Currency

        convertedAmount = (amount / rates1.sellingRate).toFixed(2);
      } else if (toSlug === "GHS" && amount && rates2?.buyingRate) {
        setCurrentRate({
          from: fromSlug,
          to: toSlug,
          rate: rates2?.buyingRate,
        });

        // ✅ Foreign Currency → GHS
        convertedAmount = (amount * rates2.buyingRate).toFixed(2);
      } else if (amount1 !== "" && amount2 !== "") {
        // ❌ Block unsupported conversions (e.g., USD → EUR)
        // toast({
        //   variant: "destructive",
        //   title: `Direct conversion from ${fromSlug} to ${toSlug} is not supported.`,
        // });
        // return "-";
      }
    } else {
      if (fromSlug === "GHS" && amount && rates1?.buyingRate) {
        setCurrentRate({
          from: fromSlug,
          to: toSlug,
          rate: rates1?.buyingRate,
        });
        // ✅ GHS → Foreign Currency
        convertedAmount = (amount / rates1.buyingRate).toFixed(2);
      } else if (toSlug === "GHS" && amount && rates2?.sellingRate) {
        setCurrentRate({
          from: fromSlug,
          to: toSlug,
          rate: rates2?.sellingRate,
        });
        // ✅ Foreign Currency → GHS
        convertedAmount = (amount * rates2.sellingRate).toFixed(2);
      } else if (amount1 !== "" && amount2 !== "") {
        // ❌ Block unsupported conversions (e.g., USD → EUR)
        // toast({
        //   variant: "destructive",
        //   title: `Direct conversion from ${fromSlug} to ${toSlug} is not supported.`,
        // });
        // return "-";
      }
    }

    return convertedAmount;
  };

  const availableCurrencies = React.useMemo(
    () => getAvailableCurrencies(companyData),
    [companyData]
  );

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = sanitizeInput(e.target.value);
    setIsTypingInAmount1(true);

    // Prevent multiple decimal points or 'e' in the input
    if ((rawValue.match(/\./g) || []).length > 1) return;
    if ((rawValue.match(/e/gi) || []).length > 1) return;

    let num = parseFloat(rawValue);
    if (isNaN(num)) {
      setAmount1(""); // Reset if input is invalid
      return;
    }

    // Convert to exponential notation if large
    const formattedValue = num >= MAX_VALUE ? num.toExponential(4) : rawValue;
    setAmount1(formattedValue);
  };

  // React.useEffect(() => {
  //   if (isTypingInAmount1) {
  //     setAmount2(
  //       addCommasToNumber(
  //         convertCurrency(parseFloat(amount1 as string), currency1, currency2)
  //       )
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [amount1, currency1, currency2]);

  React.useEffect(() => {
    if (isTypingInAmount1) {
      setAmount2(
        addCommasToNumber(
          convertCurrency(parseFloat(amount1 as string), currency1, currency2)
        )
      );
    } else {
      setAmount1(
        addCommasToNumber(
          convertCurrency(parseFloat(amount2 as string), currency2, currency1)
        )
      );
    }
    // Add rateType to the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount1, amount2, currency1, currency2]);

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = sanitizeInput(e.target.value);
    setIsTypingInAmount1(false);

    // Prevent multiple decimal points or 'e' in the input
    if ((rawValue.match(/\./g) || []).length > 1) return;
    if ((rawValue.match(/e/gi) || []).length > 1) return;

    let num = parseFloat(rawValue);
    if (isNaN(num)) {
      setAmount2(""); // Reset if input is invalid
      return;
    }

    // Convert to exponential notation if large
    const formattedValue = num >= MAX_VALUE ? num.toExponential(4) : rawValue;
    setAmount2(formattedValue);
  };

  // React.useEffect(() => {
  //   if (!isTypingInAmount1) {
  //     setAmount1(
  //       addCommasToNumber(
  //         convertCurrency(parseFloat(amount2 as string), currency2, currency1)
  //       )
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [amount2, currency1, currency2]);

  const onChangeCurrencyOneFunc = (value: string) => {
    setCurrency1((prev) => {
      if (value === currency2) {
        setCurrency2(prev);
      }
      return value;
    });
  };

  const onChangeCurrencyTwoFunc = (value: string) => {
    setCurrency2((prev) => {
      if (value === currency1) {
        setCurrency1(prev);
      }
      return value;
    });
  };

  return (
    <div
      className={
        "flex gap-3 w-full max-w-spacing-640 flex-col items-start justify-center " +
        className
      }
    >
      {/* <p className="text-paragraph-md-semibold">Convert Any Amount</p> */}
      <Card className="w-full sm:p-4 p-2 shadow-sm bg-background-bg-secondary rounded-2xl">
        <CardContent>
          <div className="">
            {/* Input 1 */}
            <div className="flex gap-0 bg-white p-2 rounded-xl flex-col">
              <p className="text-paragraph-md-semibold mb-1 px-1">Amount</p>
              <div className="bg-white flex flex-row items-center">
                <Select
                  value={currency1}
                  onValueChange={(value) => onChangeCurrencyOneFunc(value)}
                >
                  <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none  ">
                    <SelectValue>
                      <span
                        className={`fi-${getCurrencyFlag(
                          currency1
                        )} rounded-full h-6 w-6 object-cover flex items-center justify-center fis`}
                      />
                      {currency1}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableCurrencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex items-center w-full justify-end flex-row">
                  <Input
                    type="tel"
                    inputMode="decimal"
                    placeholder={symbolMap[currency1]}
                    value={formatAmount(amount1, currency1)}
                    onChange={handleAmount1Change}
                    onBlur={() => setIsTyping(false)}
                    className="!border-none !p-0 !w-auto !min-w-0 !max-w-full text-right border-transparent focus:!ring-offset-0 focus:border-transparent focus:!ring-0 focus:!outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="relative py-1.5 items-center flex">
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 !rounded-full border-border-border-secondary hover:!bg-white !border"
                  onClick={handleSwap}
                >
                  <ArrowUpDown className="h-4 w-4 text-icon-icon-tertiary" />
                </Button>
              </div>
              <div className="h-px bg-border left-1/2 translate-x-1/2 my-4 w-1/2" />
            </div>

            {/* Input 2 */}
            <div className="flex gap-0 bg-white p-2 rounded-xl flex-col">
              <p className="text-paragraph-md-semibold mb-1 px-1">
                Converted to
              </p>
              <div className="bg-white flex flex-row items-center">
                <Select
                  value={currency2}
                  onValueChange={(value) => onChangeCurrencyTwoFunc(value)}
                >
                  <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none  ">
                    <SelectValue>
                      <span
                        className={`fi-${getCurrencyFlag(
                          currency2
                        )} rounded-full h-6 w-6 object-cover flex items-center justify-center fis`}
                      />
                      {currency2}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableCurrencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex items-center w-full justify-end flex-row">
                  <Input
                    type="tel"
                    inputMode="decimal"
                    placeholder={symbolMap[currency2]}
                    value={formatAmount2(amount2, currency2)}
                    onChange={handleAmount2Change}
                    onBlur={() => setIsTyping2(false)}
                    className="!border-none !p-0 !w-auto !min-w-0 !max-w-full text-right border-transparent focus:!ring-offset-0 focus:border-transparent focus:!ring-0 focus:!outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Current rate */}
            <div className="flex mt-2 gap-0 bg-white p-2 rounded-xl flex-row justify-between items-center">
              <p className="text-paragraph-sm-semibold sm:text-paragraph-md-semibold px-1">
                Our current rate
              </p>
              <p className="text-paragraph-sm-semibold sm:text-paragraph-md-semibold px-1">
                {/* {symbolMap[currentRate.from]}1 = {symbolMap[currentRate.to]}
                {currentRate.rate.toFixed(2)} */}

                {formatRateDisplay(
                  currentRate.from,
                  currentRate.to,
                  currentRate.rate
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
