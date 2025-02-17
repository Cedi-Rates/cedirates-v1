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
import {
  getAvailableCurrencies,
  addCommasToNumber,
} from "@/utils/currencyConverterFunc";

type Props = {
  companyData: CompanyRate;
  className?: string;
};

export default function CurrencyConverter({ companyData, className }: Props) {
  const [amount1, setAmount1] = React.useState<string | number>("50.00");
  const [amount2, setAmount2] = React.useState<string | number>("0.00");
  const [currency1, setCurrency1] = React.useState("USD");
  const [currency2, setCurrency2] = React.useState("GHS");
  const [isTypingInAmount1, setIsTypingInAmount1] = React.useState(true);

  const savedAmount1 = sessionStorage.getItem("cedirates-amount1") || "";
  const savedAmount2 = sessionStorage.getItem("cedirates-amount2") || "";

  const { toast } = useToast();

  const symbolMap: Record<string, string> = {
    USD: "$",
    GHS: "₵",
    GBP: "£",
    EUR: "€",
  };

  const paddingMap: Record<string, number> = {
    USD: 28,
    GHS: 28,
    GBP: 28,
    EUR: 28,
  };

  const handleSwap = () => {
    setAmount1(amount2); // Use the current state, not saved session values
    setAmount2(amount1);
    setCurrency1(currency2);
    setCurrency2(currency1);
    setIsTypingInAmount1(!isTypingInAmount1); // Flip the typing state
  };

  const isConversionSupported = (from: string, to: string) => {
    const supportedConversions = [
      "GHS/USD",
      "GHS/GBP",
      "GHS/EUR",
      "USD/GHS",
      "GBP/GHS",
      "EUR/GHS",
    ];
    return supportedConversions.includes(`${from}/${to}`);
  };

  const convertCurrency = (amount: number, from: string, to: string) => {
    if (!isConversionSupported(from, to) || !companyData) {
      toast({
        variant: "destructive",
        title: `Exchange rate data not available for the selected currency pair`,
      });
    }

    const rates = companyData.data;
    const fromSlug = from.toLowerCase();
    const toSlug = to.toLowerCase();
    let toCurrency = "";
    let fromCurrency = "";

    let convertedAmount: number | string = "-";

    switch (fromSlug) {
      case "usd":
        fromCurrency = "dollar";
        break;
      case "eur":
        fromCurrency = "euro";
        break;
      case "gbp":
        fromCurrency = "pound";
        break;
      default:
        break;
    }

    switch (toSlug) {
      case "usd":
        toCurrency = "dollar";
        break;
      case "eur":
        toCurrency = "euro";
        break;
      case "gbp":
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
      if (from === "GHS" && amount && rates1?.sellingRate) {
        // ✅ GHS → Foreign Currency
        convertedAmount = (amount / rates1.sellingRate).toFixed(2);
      } else if (to === "GHS" && amount && rates2?.buyingRate) {
        // ✅ Foreign Currency → GHS
        convertedAmount = (amount * rates2.buyingRate).toFixed(2);
      } else if (amount1 !== "" && amount2 !== "") {
        // ❌ Block unsupported conversions (e.g., USD → EUR)
        toast({
          variant: "destructive",
          title: `Direct conversion between ${from} and ${to} is not supported.`,
        });
        return "-";
      }
    } else {
      if (from === "GHS" && amount && rates1?.buyingRate) {
        // ✅ GHS → Foreign Currency
        convertedAmount = (amount / rates1.buyingRate).toFixed(2);
      } else if (to === "GHS" && amount && rates2?.sellingRate) {
        // ✅ Foreign Currency → GHS
        convertedAmount = (amount * rates2.sellingRate).toFixed(2);
      } else if (amount1 !== "-" && amount2 !== "-") {
        // ❌ Block unsupported conversions (e.g., USD → EUR)
        toast({
          variant: "destructive",
          title: `Direct conversion between ${from} and ${to} is not supported.`,
        });
        return "-";
      }
    }

    return convertedAmount;
  };

  const availableCurrencies = React.useMemo(
    () => getAvailableCurrencies(companyData),
    [companyData]
  );

  React.useEffect(() => {
    if (isTypingInAmount1) {
      setAmount2(
        addCommasToNumber(
          convertCurrency(parseFloat(amount1 as string), currency1, currency2)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount1, currency1, currency2]);

  React.useEffect(() => {
    if (!isTypingInAmount1) {
      setAmount1(
        addCommasToNumber(
          convertCurrency(parseFloat(amount2 as string), currency2, currency1)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount2, currency1, currency2]);

  return (
    <div className={"flex gap-3 w-full flex-col items-start justify-center " + className}>
      {/* <p className="text-paragraph-md-semibold">Convert Any Amount</p> */}
      <Card className="w-full sm:p-4 p-2 shadow-sm bg-background-bg-secondary rounded-2xl">
        <CardContent>
          <div className="">
            {/* Input 1 */}
            <div className="flex gap-0 bg-white p-2 rounded-xl flex-col">
            <p className="text-paragraph-sm-semibold sm:text-paragraph-md-semibold mb-1 px-1">
            Amount
          </p>
          <div className="bg-white flex flex-row items-center">
          <Select value={currency1} onValueChange={setCurrency1}>
                <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none  ">
                  <SelectValue><div className="h-6 w-6 bg-black rounded-full" /> {currency1}</SelectValue>
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
              <span className="text-muted-foreground">
                  {symbolMap[currency1]}
                </span>
                <Input
  type="tel"
  inputMode="decimal"
  value={amount1}
  onChange={(e) => {
    setIsTypingInAmount1(true);
    setAmount1(e.target.value);
  }}
  size={(amount1?.toString().length || 1)}
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
            <p className="text-paragraph-sm-semibold sm:text-paragraph-md-semibold mb-1 px-1">
            Converted to
          </p>
          <div className="bg-white flex flex-row items-center">
          <Select value={currency2} onValueChange={setCurrency1}>
                <SelectTrigger className="w-fit gap-1 border-transparent [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:!flex-row focus:border-transparent focus:!ring-offset-0 focus:!outline-none focus:!ring-0 h-full rounded-xl !border-none  ">
                  <SelectValue><div className="h-6 w-6 bg-black rounded-full" /> {currency2}</SelectValue>
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
              <span className="text-muted-foreground">
                  {symbolMap[currency2]}
                </span>
                <Input
  type="tel"
  inputMode="decimal"
  value={amount2}
  onChange={(e) => {
    setIsTypingInAmount1(false);
    setAmount2(e.target.value);
  }}
  size={(amount2?.toString().length || 1)}
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
            $1 = ¢15.46
          </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
