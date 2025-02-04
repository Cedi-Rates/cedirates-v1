"use client";

import React, { createContext, useEffect, useState } from "react";
import {
  CompanyRate,
  CompleteCompanyDetailsType,
  UserDetailsType,
} from "@/utils/types";
import style from "../../assets/styles/company.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import moment from "moment";
import FuelStats from "./FuelStats";
import ExchangeStats from "./ExchangeStats";
import { useRouter } from "next/navigation";
import PriceReportPopup from "./price-input/PriceReportPopup";
import CompanyDetails from "../listing/company-details";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { getChartData, getFuelChartData } from "@/utils/company";
import urlManager from "@/utils/urlManager";
import FuelChartComponent from "./components/tradeview-chart-fuel";
import AuthDialog from "../auth/AuthDialog";

type TabContextType = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

const DynamicComponent = dynamic(() => import("./components/tradeview-chart"), {
  ssr: false,
});

const DynamicFuelComponent = dynamic(
  () => import("./components/tradeview-chart-fuel"),
  {
    ssr: false,
  }
);

export const TabContext = createContext<TabContextType | undefined>(undefined);

moment.suppressDeprecationWarnings = true;

type Props = {
  companyDetails: CompleteCompanyDetailsType;
  companyData: CompanyRate;
  user: UserDetailsType;
};

const determineDefaultValue = (rates: any) => {
  if (rates?.dollarRates?.buyingRate || rates?.dollarRates?.sellingRate) {
    return "dollarRates";
  }
  if (rates?.poundRates?.buyingRate || rates?.poundRates?.sellingRate) {
    return "poundRates";
  }
  if (rates?.euroRates?.buyingRate || rates?.euroRates?.sellingRate) {
    return "euroRates";
  }
  return "dollarRates";
};

const RatesSection = ({ companyDetails, user, companyData }: Props) => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, setState] = useState<any>();

  const currentRate =
    companyDetails?.data && companyDetails.data.length > 0
      ? companyDetails.data[companyDetails.data.length - 1]
      : null;

  const defaultValue = determineDefaultValue(currentRate?.rates);

  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const isFuelCompany = companyDetails?.company?.category === "fuelPrices";

  useEffect(() => {
    const fetchChartData = async () => {
      const chartsData = await getChartData(
        companyDetails?.company?.companyName,
        selectedTab
      );
      if (chartsData) {
        setState(chartsData);
      }
    };

    const fetchFuelChartData = async () => {
      const chartsData = await getFuelChartData(
        companyDetails?.company?.companyName
      );
      if (chartsData) {
        setState(chartsData);
      }
    };

    if (isFuelCompany) {
      fetchFuelChartData();
    } else {
      fetchChartData();
    }
  }, [companyDetails, isFuelCompany, selectedTab]);

  console.log("ratesection", companyData);

  return (
    <>
      <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
        <div className="w-auto">
          <div className="flex justify-between items-center my-3">
            <div className="w-fit">
              <h1 className="sm:text-[16px] text-[14px] mb-2 font-bold">
                {isFuelCompany ? (
                  <>
                    {companyDetails.company?.companyName} {"  "} Fuel Prices
                    Today
                  </>
                ) : (
                  <>
                    {selectedTab === "dollarRates" && (
                      <>
                        {companyDetails.company?.companyName} Dollar Rate Today
                      </>
                    )}
                    {selectedTab === "poundRates" && (
                      <>
                        {companyDetails.company?.companyName} Pound Rate Today
                      </>
                    )}
                    {selectedTab === "euroRates" && (
                      <>{companyDetails.company?.companyName} Euro Rate Today</>
                    )}
                  </>
                )}
              </h1>
            </div>

            <div className="flex items-center">
              {user?.email ? (
                <button
                  className="sm:text-[14px] text-[12px] bg-primary text-white rounded-lg sm:px-4 px-2 py-2 text-nowrap"
                  onClick={() => setOpen(true)}
                >
                  {isFuelCompany ? "Report Fuel Prices" : "Report Rates"}
                </button>
              ) : (
                <button
                  className="sm:text-[14px] text-[12px] bg-[#e62246] text-white rounded-lg sm:px-4 px-2 py-2 text-nowrap"
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  {isFuelCompany
                    ? "Login To Report Prices"
                    : "Login To Report Rates"}
                </button>
              )}
            </div>
          </div>
          {isFuelCompany ? (
            <FuelStats
              user={user}
              companyDetails={companyDetails}
              companyData={companyData}
            />
          ) : (
            <ExchangeStats
              companyDetails={companyDetails}
              companyData={companyData}
            />
          )}

          <div className="flex flex-col mb-8">
            <div
              className="my-4 w-max flex flex-row gap-2 text-primary cursor-pointer"
              onClick={() => setOpenChart((prev) => !prev)}
            ></div>

            {isFuelCompany ? (
              state ? (
                <DynamicFuelComponent state={state} />
              ) : (
                <Skeleton className="w-full h-[350px] rounded-xl" />
              )
            ) : state ? (
              <DynamicComponent state={state} />
            ) : (
              <Skeleton className="w-full h-[350px] rounded-xl" />
            )}
          </div>
          <PriceReportPopup
            open={open}
            setOpen={setOpen}
            companyDetails={companyDetails}
            companyData={companyData}
            user={user}
          />
        </div>
      </TabContext.Provider>

      <AuthDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default RatesSection;
