"use client";
import React, { useState, useEffect, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dollar from "./dollar";
import Pound from "./pound";
import Euro from "./euro";
import {
  CompleteCompanyDetailsType,
  SingleEventType,
  ReviewType,
  UserDetailsType,
  CompanyDataType,
  CompanyRate,
} from "@/utils/types";
import { TabContext } from "../RatesSection";

interface AlertDialogDemoProps {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  setOpen?: (open: boolean) => void;
  companyData: CompanyRate;
}

const RatesModal: React.FC<AlertDialogDemoProps> = ({
  companyDetails,
  user,
  setOpen,
  companyData,
}) => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("RatesModal must be used within a TabContext.Provider");
  }

  const { selectedTab, setSelectedTab } = context;

  console.log("reportPrice", companyData);

  return (
    <Tabs
      defaultValue={selectedTab || "dollarRates"}
      onValueChange={setSelectedTab}
    >
      <TabsList className="grid w-full grid-cols-3 bg-gray-200 max-w-sm mx-auto">
        <TabsTrigger value="dollarRates">Dollar</TabsTrigger>
        <TabsTrigger value="poundRates">Pound</TabsTrigger>
        <TabsTrigger value="euroRates">Euro</TabsTrigger>
      </TabsList>
      <TabsContent value="dollarRates">
        <Dollar companyDetails={companyDetails} companyData={companyData} />
      </TabsContent>
      <TabsContent value="poundRates">
        <Pound companyDetails={companyDetails} companyData={companyData} />
      </TabsContent>
      <TabsContent value="euroRates">
        <Euro companyDetails={companyDetails} companyData={companyData} />
      </TabsContent>
    </Tabs>
  );
};

export default RatesModal;
