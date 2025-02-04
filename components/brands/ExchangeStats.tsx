import type { CompanyRate, CompleteCompanyDetailsType } from "@/utils/types";
import React, { useContext } from "react";
import { TabContext } from "./RatesSection";
import { DollarSign, Euro, PoundSterling } from "lucide-react";

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  companyData: CompanyRate;
};

const ExchangeStats = ({ companyDetails, companyData }: Props) => {
  const context = useContext(TabContext);
  const selectedTab = context?.selectedTab || "dollarRates";
  const currentRate = companyData.data;

  // Currency rates mapping
  const rates = {
    dollarRates: {
      title: "Dollar".toUpperCase(),
      icon: DollarSign,
      buying: currentRate?.dollarRates?.buyingRate ?? null,
      selling: currentRate?.dollarRates?.sellingRate ?? null,
    },
    poundRates: {
      title: "Pound".toUpperCase(),
      icon: PoundSterling,
      buying: currentRate?.poundRates?.buyingRate ?? null,
      selling: currentRate?.poundRates?.sellingRate ?? null,
    },
    euroRates: {
      title: "Euro".toUpperCase(),
      icon: Euro,
      buying: currentRate?.euroRates?.buyingRate ?? null,
      selling: currentRate?.euroRates?.sellingRate ?? null,
    },
  };

  // Format rate safely
  const formatRate = (rate: number | null) =>
    rate && rate > 0 ? (Math.floor(rate * 100) / 100).toFixed(2) : "-";

  // Tabs mapping
  const tabs = Object.entries(rates).map(([key, value]) => ({
    id: key,
    icon: value.icon,
    label: value.title,
    disabled: !value.buying && !value.selling,
  }));

  // Selected currency data
  const selectedRate = rates[selectedTab as keyof typeof rates];

  return (
    <div className="flex flex-col gap-4">
      {/* Currency Tabs */}
      <div className="flex gap-1">
        {tabs.map(({ id, icon: Icon, label, disabled }) => (
          <button
            key={id}
            onClick={() => context?.setSelectedTab(id)}
            disabled={disabled}
            className={`px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-medium ${
              selectedTab === id
                ? "bg-backgroundInfo text-text-text-brand"
                : "bg-white text-gray-600"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Exchange Rate Display */}
      <div className="grid grid-cols-2 max-w-[652px] gap-3">
        {["Buying", "Selling"].map((type, index) => (
          <div
            key={type}
            className="px-spacing-16 w-full flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]"
          >
            <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">
              {type}
            </p>
            <p
              className={`text-header-h3-medium leading-[30px] my-spacing-20 ${
                index === 0
                  ? "text-text-text-success"
                  : "text-text-text-warning"
              }`}
            >
              GHS{" "}
              {formatRate(
                index === 0 ? selectedRate?.buying : selectedRate?.selling
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeStats;
