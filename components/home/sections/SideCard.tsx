import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Poll from "../components/Poll";
import { PollType } from "@/utils/types";
import { AlignStartVertical, BadgeDollarSign, Fuel } from "lucide-react";
import ExchangeRatesCard from "@/components/landing/ExchangeRatesCard";
import FuelRatesCard from "@/components/landing/FuelRatesCard";

interface PressReleasesProps {
  pollData: PollType;
}

const SideCard: React.FC<PressReleasesProps> = ({ pollData }) => {
  return (
    <div className="h-full min-[1200px]:w-[434px] w-full max-[1023px]:max-w-[700px] max-[1199px]:mx-auto p-spacing-12 pt-spacing-0 lg:p-spacing-0 sidecard">
      <Card className="h-full pt-1 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        {/* underline tabs full-width */}
        <Tabs defaultValue="rates" className="relative h-full p-2 !pb-0 w-full overflow-x-scroll">
          <div className="w-full overflow-scroll no-scrollbar">
            <TabsList className="!p-0 !bg-transparent !h-full">
              <TabsTrigger
                value="rates"
                className="rounded-lg data-[state=active]:!bg-[#EFF6FF] data-[state=active]:!text-[#1896FE] hover:!text-[#1896FE] data-[state=active]:!shadow-none"
              >
                <h2 className="flex flex-row gap-1.5 items-center">
                  <BadgeDollarSign size={20} /> Exchange Rates
                </h2>
              </TabsTrigger>
              <TabsTrigger
                value="fuel"
                className="rounded-lg data-[state=active]:!bg-[#EFF6FF] data-[state=active]:!text-[#1896FE] hover:!text-[#1896FE] data-[state=active]:!shadow-none"
              >
                <h2 className="flex flex-row gap-1.5 items-center">
                  <Fuel size={20} /> Fuel Prices
                </h2>
              </TabsTrigger>
              <TabsTrigger
                value="polls"
                className="rounded-lg data-[state=active]:!bg-[#EFF6FF] data-[state=active]:!text-[#1896FE] hover:!text-[#1896FE] data-[state=active]:!shadow-none"
              >
                <h2 className="flex flex-row gap-1.5 items-center">
                  <AlignStartVertical size={20} /> Polls
                </h2>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="rates" className="overflow-x-scroll h-full mt-0">
            <ExchangeRatesCard className="!w-full" />
          </TabsContent>
          <TabsContent value="fuel" className="w-full  h-full mt-0">
            <FuelRatesCard className="!w-full" />
          </TabsContent>
          <TabsContent value="polls" className="mt-0 h-full">
            <Poll pollData={pollData} className="" />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default SideCard;
