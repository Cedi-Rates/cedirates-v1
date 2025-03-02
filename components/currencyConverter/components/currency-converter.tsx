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

import { addCommasToNumber } from "@/utils/currencyConverterFunc";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  ERD: any;
  className?: string;
  amount1: string | number;
  amount2: string | number;
  currency1: string;
  currency2: string;
  setAmount1: (value: string | number) => void;
  setAmount2: (value: string | number) => void;
  setCurrency1: (value: any) => void;
  setCurrency2: (value: any) => void;
};

const MAX_VALUE = 1e15;

const sanitizeInput = (value: string) => {
  return value.replace(/[^0-9.eE+-]/g, "");
};

export default function ConverterBox({
  ERD,
  amount1,
  amount2,
  currency1,
  currency2,
  setAmount1,
  setAmount2,
  setCurrency1,
  setCurrency2,
}: Props) {
  // const [amount1, setAmount1] = React.useState<string | number>("500.00");
  // const [amount2, setAmount2] = React.useState<string | number>("0.00");
  // const [currency1, setCurrency1] = React.useState("USD");
  // const [currency2, setCurrency2] = React.useState("GHS");
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
  const [rateType, setRateType] = React.useState<string>("Average");

  const rateTypes = [
    { value: "Average", label: "Cedirates Average" },
    { value: "Bank", label: "Bank" },
    { value: "ForexBureau", label: "Forex Bureau" },
    { value: "PaymentProcessor", label: "Card Payment" },
    { value: "MoneyTransfer", label: "Money Transfer" },
    { value: "CryptoExchange", label: "Crypto" },
    { value: "Fintech", label: "Fintech" },
  ];

  console.log(ERD);

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

  const getValidCurrencyPairs = (ERD: any, rateType: any) => {
    if (ERD) {
      const rates = ERD;
      const validPairs = new Set<string>();

      // Check dollar rates
      if (
        rateType !== "Average" &&
        rates[`average${rateType}Dollar`]?.buyingRate
      )
        validPairs.add("USD/GHS");
      if (
        rateType !== "Average" &&
        rates[`average${rateType}Dollar`]?.sellingRate
      )
        validPairs.add("GHS/USD");

      // Check euro rates
      if (rateType !== "Average" && rates[`average${rateType}Euro`]?.buyingRate)
        validPairs.add("EUR/GHS");
      if (
        rateType !== "Average" &&
        rates[`average${rateType}Euro`]?.sellingRate
      )
        validPairs.add("GHS/EUR");

      // Check pound rates
      if (
        rateType !== "Average" &&
        rates[`average${rateType}Pound`]?.buyingRate
      )
        validPairs.add("GBP/GHS");
      if (
        rateType !== "Average" &&
        rates[`average${rateType}Pound`]?.sellingRate
      )
        validPairs.add("GHS/GBP");

      return validPairs;
    }
    return new Set<string>();
  };

  const isConversionSupported = (from: string, to: string) => {
    const validPairs = getValidCurrencyPairs(ERD, rateType);
    return validPairs.has(`${from}/${to}`);
  };

  const generateCurrencyName = (currency: string) => {
    switch (currency) {
      case "USD":
        return "Dollar";
      case "EUR":
        return "Euro";
      case "GBP":
        return "Pound";
    }
  };

  const convertCurrency = (amount: number, from: string, to: string) => {
    let fromCurrency = generateCurrencyName(from);
    let toCurrency = generateCurrencyName(to);
    let convertedAmount: number | string = "";
    if (ERD) {
      if (!isConversionSupported(from, to)) {
        if (isConversionSupported(to, from)) {
          setCurrency1(to);
          setCurrency2(from);
        } else {
          setCurrency1("GHS");
        }
      }

      const ratePrefix =
        rateType === "Average" ? "average" : `average${rateType}`;

      const toAverage = `${ratePrefix}${toCurrency}`;
      const fromAverage = `${ratePrefix}${fromCurrency}`;
      const fromRateData = ERD[fromAverage];
      const toRateData = ERD[toAverage];

      if (isTypingInAmount1) {
        if (from === "GHS" && amount && toRateData?.sellingRate) {
          setCurrentRate({
            from: from,
            to: to,
            rate: toRateData?.sellingRate,
          });
          // ✅ GHS → Foreign Currency

          convertedAmount = (amount / toRateData.sellingRate).toFixed(2);
        } else if (to === "GHS" && amount && fromRateData?.buyingRate) {
          setCurrentRate({
            from: from,
            to: to,
            rate: fromRateData?.buyingRate,
          });

          // ✅ Foreign Currency → GHS
          convertedAmount = (amount * fromRateData.buyingRate).toFixed(2);
        } else if (amount1 !== "" && amount2 !== "") {
        }
      } else {
        if (from === "GHS" && amount && toRateData?.buyingRate) {
          setCurrentRate({
            from: from,
            to: to,
            rate: toRateData?.buyingRate,
          });
          // ✅ GHS → Foreign Currency
          convertedAmount = (amount / toRateData.buyingRate).toFixed(2);
        } else if (to === "GHS" && amount && fromRateData?.sellingRate) {
          setCurrentRate({
            from: from,
            to: to,
            rate: fromRateData?.sellingRate,
          });
          // ✅ Foreign Currency → GHS
          convertedAmount = (amount * fromRateData.sellingRate).toFixed(2);
        } else if (amount1 !== "" && amount2 !== "") {
        }
      }
    }
    return convertedAmount;
  };

  const getAvailableCurrencies = (ERD: any) => {
    const availableCurrencies = ["GHS"]; // GHS is always available

    const currencyMappings: Record<string, string> = {
      USD: "Dollar",
      GBP: "Pound",
      EUR: "Euro",
    };

    Object.entries(currencyMappings).forEach(([currency, key]) => {
      const ratePrefix =
        rateType === "Average" ? `average${key}` : `average${rateType}${key}`;
      if (ERD) {
        const rates = ERD[ratePrefix];

        if (rates?.buyingRate || rates?.sellingRate) {
          availableCurrencies.push(currency);
        }
      }
    });

    return availableCurrencies;
  };

  const availableCurrencies = React.useMemo(
    () => getAvailableCurrencies(ERD),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ERD, rateType]
  );

  const handleSwap = () => {
    setAmount1(amount2);
    setAmount2(amount1);
    setCurrency1(currency2);
    setCurrency2(currency1);
    setIsTypingInAmount1(!isTypingInAmount1);

    convertCurrency(parseFloat(amount1 as string), currency2, currency1);
  };

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
  }, [
    amount1,
    amount2,
    currency1,
    currency2,
    rateType,
    isTypingInAmount1,
    ERD,
  ]);

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

  const onChangeCurrencyOneFunc = (value: string) => {
    setCurrency1((prev: any) => {
      if (value === currency2) {
        setCurrency2(prev);
      }
      return value;
    });
  };

  const onChangeCurrencyTwoFunc = (value: string) => {
    setCurrency2((prev: any) => {
      if (value === currency1) {
        setCurrency1(prev);
      }
      return value;
    });
  };

  return (
    <div
      className={
        "flex gap-3 w-full max-w-spacing-640 flex-col items-start justify-center relative -top-[100px]"
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
                      <div className="h-6 w-6 bg-black rounded-full" />{" "}
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
                      <div className="h-6 w-6 bg-black rounded-full" />{" "}
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
            <div className="flex items-end gap-2 justify-between">
              <div className="flex flex-row items-end  gap-2">
                <p className="text-paragraph-sm-regular sm:text-paragraph-md-regular px-1">
                  Using
                </p>
                <Select value={rateType} onValueChange={setRateType}>
                  <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none mt-4 relative top-[7px]">
                    <SelectValue placeholder="Select rate type" />
                  </SelectTrigger>
                  <SelectContent>
                    {rateTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className=""
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <p className="text-paragraph-sm-regular sm:text-paragraph-md-regular px-1">
                  Rate
                </p>
              </div>
              <p className="text-paragraph-sm-semibold sm:text-paragraph-md-semibold px-1">
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
