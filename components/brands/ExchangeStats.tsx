import type { CompanyRate, CompleteCompanyDetailsType } from "@/utils/types";
import React, { useContext } from "react";
import { TabContext } from "./RatesSection";
import { DollarSign, Euro, PoundSterling } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
      title: "Dollar",
      icon: DollarSign,
      buying: currentRate?.dollarRates?.buyingRate ?? null,
      selling: currentRate?.dollarRates?.sellingRate ?? null,
    },
    poundRates: {
      title: "Pound",
      icon: PoundSterling,
      buying: currentRate?.poundRates?.buyingRate ?? null,
      selling: currentRate?.poundRates?.sellingRate ?? null,
    },
    euroRates: {
      title: "Euro",
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
      <Tabs value={selectedTab} className="rounded-xl" onValueChange={(id) => context?.setSelectedTab(id)}>
        <TabsList className="flex gap-1 w-min rounded-lg">
          {tabs.map(({ id, icon: Icon, label, disabled }) => (
            <TabsTrigger key={id} value={id} disabled={disabled} className={`flex items-center rounded-md gap-1 text-sm font-medium ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
              {/* <Icon size={18} /> */}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Exchange Rate Display */}
        <div className="w-full overflow-x-scroll">
        <TabsContent value={selectedTab}>
          <div className="flex flex-row gap-3">
            {["Buying", "Selling"].map((type, index) => (
              <div
                key={type}
                className="px-spacing-16 sm:w-full w-min flex max-w-[320px] flex-col border-2 rounded-xl border-[#E5E5E5]"
              >
                <p className="text-text-text-primary text-paragraph-lg-semibold my-spacing-12">
                  {type}
                </p>
                <p
                  className={`text-header-h3-medium w-max leading-[30px] my-spacing-20 ${
                    index === 0
                      ? "text-text-text-success"
                      : "text-text-text-warning"
                  }`}
                >
                  ¢{""}
                  {formatRate(
                    index === 0 ? selectedRate?.buying : selectedRate?.selling
                  )}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ExchangeStats;
