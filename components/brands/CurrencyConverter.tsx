"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "../ui/separator"

export default function CurrencyConverter() {
  const [amount1, setAmount1] = React.useState("0.00")
  const [amount2, setAmount2] = React.useState("0.00")
  const [currency1, setCurrency1] = React.useState("USD")
  const [currency2, setCurrency2] = React.useState("GHS")

  const handleSwap = () => {
    const tempCurrency = currency1
    setCurrency1(currency2)
    setCurrency2(tempCurrency)
    const tempAmount = amount1
    setAmount1(amount2)
    setAmount2(tempAmount)
  }

  return (
    <div className="flex gap-3 w-full flex-col items-start justify-center">
      <p className="text-paragraph-md-semibold">Convert Any Amount</p>
      <Card className="w-full border rounded-lg p-4 shadow-sm border-border-border-tertiary">
        <CardContent className="">
          <h1 className="text-paragraph-md-semibold mb-2">Currency Converter</h1>
          <Separator />
          <div className="mt-6">  
            <div className="flex gap-0 h-[40px]">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  className="pl-7 rounded-xl rounded-r-none focus:!ring-0 focus:!outline-none"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              </div>
              <Select value={currency1} onValueChange={setCurrency1}>
                <SelectTrigger className="w-fit gap-1 focus:!outline-none focus:!ring-0 h-full rounded-xl rounded-l-none border-l-0">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/192x144/${currency1.toLowerCase().slice(0, 2)}.png`}
                        alt={currency1}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      {currency1}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://flagcdn.com/w20/us.png"
                        alt="USD"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      USD
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

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

            <div className="flex gap-0 h-[40px]">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={amount2}
                  onChange={(e) => setAmount2(e.target.value)}
                  className="pl-[52px] rounded-xl rounded-r-none focus:!ring-0 focus:!outline-none"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">GHS</span>
              </div>
              <Select value={currency2} onValueChange={setCurrency2}>
                <SelectTrigger className="w-fit gap-1 focus:!outline-none focus:!ring-0 h-full rounded-xl rounded-l-none border-l-0">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/192x144/${currency2.toLowerCase().slice(0, 2)}.png`}
                        alt={currency2}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      {currency2}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://flagcdn.com/w20/us.png"
                        alt="USD"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      USD
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

