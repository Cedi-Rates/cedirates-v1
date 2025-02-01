"use client"

import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function ExchangeRateCard({ to, data }: { to: 'USD' | 'GBP' | 'EUR', data: any }) {
  return (
    <div className="w-full min-w-max max-w-xs p-1">
      <Card className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-white text-black">
        <div className="px-3 py-3 flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            {data.trend === 'increase' ? <ArrowUp className="text-red-500 h-3 w-3" /> : <ArrowDown className="text-green-500 h-3 w-3" />}
            <span className="text-[0.875rem] font-semibold leading-tight">GHS to {to}</span>
          </div>
          <div className="flex justify-between h-full gap-5">
            <span className="text-[2.333rem] font-semibold tracking-tighter leading-none">{data.figure.toFixed(2)}</span> {/* 37.33px */}
            <div className="flex flex-col items-end">
              <div className={`text-${data.trend === 'decrease' ? 'green' : 'red'}-500 text-[0.875rem] leading-tight`}> {/* 14px */}
                {data.trend === 'increase' && '+'}{data.inflationDecimal} ({data.inflation})
              </div>
              <span className="text-[0.875rem] leading-tight text-black/60">Average Selling</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
