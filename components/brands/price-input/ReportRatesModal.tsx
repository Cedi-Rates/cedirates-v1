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
} from "@/utils/types";
import { TabContext } from "../RatesSection";

interface AlertDialogDemoProps {
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  setOpen?: (open: boolean) => void;
}

const RatesModal: React.FC<AlertDialogDemoProps> = ({
  companyDetails,
  user,
  setOpen,
}) => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("RatesModal must be used within a TabContext.Provider");
  }

  const { selectedTab, setSelectedTab } = context;

  return (
    <Tabs defaultValue={selectedTab || "dollar"} onValueChange={setSelectedTab}>
      <TabsList className="grid w-full grid-cols-3 bg-gray-200 max-w-sm mx-auto">
        <TabsTrigger value="dollar">Dollar</TabsTrigger>
        <TabsTrigger value="pound">Pound</TabsTrigger>
        <TabsTrigger value="euro">Euro</TabsTrigger>
      </TabsList>
      <TabsContent value="dollar">
        <Dollar companyDetails={companyDetails} />
      </TabsContent>
      <TabsContent value="pound">
        <Pound companyDetails={companyDetails} />
      </TabsContent>
      <TabsContent value="euro">
        <Euro companyDetails={companyDetails} />
      </TabsContent>
    </Tabs>
  );
};

export default RatesModal;
