import type { CompanyRate, CompleteCompanyDetailsType } from "@/utils/types"
import React, { useContext } from "react"
import { TabContext } from "./RatesSection"
import { DollarSign, Euro, Icon, PoundSterling } from "lucide-react"

type Props = {
  companyDetails: CompleteCompanyDetailsType
  companyData: CompanyRate
}

const ExchangeStats = ({ companyDetails, companyData }: Props) => {
  const context = useContext(TabContext)
  const currentRate = companyData.data
  const selectedTab = context?.selectedTab || "dollarRates"

  const rates = {
    dollarRates: {
      title: "Dollar".toLocaleUpperCase(),
      icon: DollarSign,
      buying: currentRate?.dollarRates?.buyingRate,
      selling: currentRate?.dollarRates?.sellingRate,
    },
    poundRates: {
      title: "Pound".toLocaleUpperCase(),
      icon: PoundSterling,
      buying: currentRate?.poundRates?.buyingRate,
      selling: currentRate?.poundRates?.sellingRate,
    },
    euroRates: {
      title: "Euro".toLocaleUpperCase(),
      icon: Euro,
      buying: currentRate?.euroRates?.buyingRate,
      selling: currentRate?.euroRates?.sellingRate,
    },
  }

  const tabs = Object.entries(rates).map(([key, value]) => ({
    id: key,
    icon: value.icon,
    label: value.title,
    disabled: !value.buying && !value.selling,
  }))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => context?.setSelectedTab(tab.id)}
            disabled={tab.disabled}
            className={`px-3 py-2 items-center flex flex-row gap-1 rounded-lg text-sm font-medium ${
              selectedTab === tab.id ? "bg-backgroundInfo text-text-text-brand" : "bg-white text-gray-600"
            } ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 max-w-[652px] gap-3">
        <div className="px-spacing-16 w-full flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]">
          <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Buying</p>
          <p className="text-header-h3-medium text-text-text-success leading-[30px] my-spacing-20">
            GHS{" "}
            {(rates[selectedTab as keyof typeof rates]?.buying ?? 0) > 0
              ? (Math.floor((rates[selectedTab as keyof typeof rates]?.buying ?? 0) * 100) / 100).toFixed(2)
              : "-"}
          </p>
        </div>

        <div className="px-spacing-16 w-full flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]">
          <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">Selling</p>
          <p className="text-header-h3-medium text-text-text-warning leading-[30px] my-spacing-20">
            GHS{" "}
            {(rates[selectedTab as keyof typeof rates]?.selling ?? 0) > 0
              ? (Math.floor(rates[selectedTab as keyof typeof rates]?.selling ?? 0 * 100) / 100).toFixed(2)
              : "-"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExchangeStats

