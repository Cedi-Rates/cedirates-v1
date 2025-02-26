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
import { CompanyRate } from "@/utils/types";
import { useToast } from "../ui/use-toast";
import {
  getAvailableCurrencies,
  addCommasToNumber,
} from "@/utils/currencyConverterFunc";

type FuelRates = {
  petrol?: number;
  diesel?: number;
  premium?: number;
};

type Props = {
  className?: string;
  companyData: CompanyRate;
};

const MAX_VALUE = 1e15;

const sanitizeInput = (value: string) => {
  return value.replace(/[^0-9.eE+-]/g, "");
};

export default function FuelTankCalc({ className, companyData }: Props) {
  const [amount1, setAmount1] = React.useState<string | number>("500.00");
  const [amount2, setAmount2] = React.useState<string | number>("0.00");
  const [currency1, setCurrency1] = React.useState("Petrol");
  const [currency2, setCurrency2] = React.useState("Litres");
  const [isTypingInAmount1, setIsTypingInAmount1] = React.useState(true);
  const [isTyping, setIsTyping] = React.useState(false);

  const { toast } = useToast();

  const getAvailableFuelTypes = (companyData: CompanyRate) => {
    const fuelTypes = [];
    const rates = companyData?.data;
    if (rates?.petrol) fuelTypes.push("Petrol");
    if (rates?.diesel) fuelTypes.push("Diesel");
    if (rates?.premium) fuelTypes.push("Premium");

    return fuelTypes;
  };

  const convertCurrency = (amount: number, from: string, to: string) => {
    if (!companyData) {
      toast({
        variant: "destructive",
        title: "Fuel rates not available",
      });
      return "-";
    }

    const fuelRates = companyData.data;
    let convertedAmount: number | string = "-";
    // Converting from currency to litres
    if (to === "Litres") {
      const rate = fuelRates[from.toLowerCase() as keyof FuelRates];
      if (!rate) {
        toast({
          variant: "destructive",
          title: `${from} rate not available`,
        });
        return "-";
      }
      convertedAmount = (amount / rate).toFixed(2);
    }
    // Converting from litres to currency
    else if (from === "Litres") {
      const rate = fuelRates[to.toLowerCase() as keyof FuelRates];
      if (!rate) {
        toast({
          variant: "destructive",
          title: `${to} rate not available`,
        });
        return "-";
      }
      convertedAmount = (amount * rate).toFixed(2);
    }

    return convertedAmount;
  };

  const formatAmount = (amount: string | number) => {
    if (!amount) return ""; 
    return isTyping ? amount : `₵${amount}`;
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

  React.useEffect(() => {
    if (isTypingInAmount1) {
      setAmount2(
        addCommasToNumber(
          convertCurrency(
            parseFloat(amount1 as string) || 0,
            currency1,
            currency2
          )
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount1, currency1, currency2]);

  React.useEffect(() => {
    if (!isTypingInAmount1) {
      setAmount1(
        addCommasToNumber(
          convertCurrency(
            parseFloat(amount2 as string) || 0,
            currency2,
            currency1
          )
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount2, currency1, currency2]);

  return (
    <div
      className={
        "max-w-spacing-640 flex gap-3 w-full flex-col items-start justify-center " +
        className
      }
    >
      {/* <p className="text-paragraph-md-semibold">Convert Any Amount</p> */}
      <Card className="w-full border rounded-lg p-4 shadow-sm border-border-border-tertiary">
        <CardContent>
          <h1 className="text-paragraph-md-semibold mb-2">Cost of full tank</h1>
          <Separator />
          <div className="mt-6">
            {/* Input 1 */}
            <div className="flex gap-0 h-[40px]">
              <div className="relative flex-1">
                <Input
                  type="tel"
                  inputMode="decimal"
                  placeholder="₵"
                  value={formatAmount(amount1)}
                  onChange={handleAmount1Change}
                  // style={{ paddingLeft: `${paddingMap[currency1]}px` }}
                  onBlur={() => setIsTyping(false)}
                  className="rounded-xl rounded-r-none focus:!ring-0 focus:!outline-none"
                />
              </div>
              <Select value={currency1} onValueChange={setCurrency1}>
                <SelectTrigger className="w-fit gap-1 focus:!outline-none focus:!ring-0 h-full rounded-xl rounded-l-none border-l-0">
                  <SelectValue>{currency1}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {getAvailableFuelTypes(companyData).map((fuelType) => (
                    <SelectItem key={fuelType} value={fuelType}>
                      {fuelType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="relative py-1.5 items-center flex">
              <div className="h-px bg-border left-1/2 translate-x-1/2 my-4 w-1/2" />
            </div>

            {/* Input 2 */}
            <div className="flex gap-0 h-[40px]">
              <div className="relative flex-1">
                <Input
                  type="tel"
                  inputMode="decimal"
                  value={amount2}
                  onChange={handleAmount2Change}
                  // style={{ paddingLeft: `${paddingMap[currency2]}px` }}
                  className="rounded-xl rounded-r-none focus:!ring-0 focus:!outline-none"
                />
              </div>

              <Button className="w-fit h-full rounded-xl rounded-l-none font-medium border-l-0 bg-white border-[1px] border-[#e5e5e5] !text-black hover:bg-white hover:border-[#e5e5e5] hover:text-black disabled:bg-white disabled:border-[#e5e5e5] disabled:text-black pointer-events-none">
                Litres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
