"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Flame,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import NoResults from "@/assets/svgs/NoResults";
import ExchangeRateCard from "./exchange-rate-card";
import Marquee from "react-fast-marquee";
import { Input } from "@/components/ui/input";
import { companyType } from "@/utils/types";
import {
  getAllBlogs,
  getAverage,
  getExchangeRates,
  getFuelRates,
} from "@/utils/helpers/api";
import { getAverageForToday } from "@/utils/currencyConverterFunc";
import moment from "moment";
import Link from "next/link";
import { CommandLoading } from "cmdk";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [exchangeCompanies, setExchangeRateCompaines] = React.useState<any[]>(
    []
  );
  const [fuelCompanies, setFuelCompaines] = React.useState<any[]>([]);
  const [blogs, setBlogs] = React.useState<{ title: string; url: string }[]>(
    []
  );
  const [avg, setAvg] = React.useState<any[]>([]);

  const pinnedRates = ["C-CAR7Y8D4", "C-ECP9W9I8", "C-LEP0T7V9"];
  const pinnedFuel = ["C-SHQ8X2D8", "C-JPP9Y6A0", "C-STW2G0X6"];
  const pinnedAver = ["averageDollar", "averageEuro", "averagePound"];

  function preloadImages(urls: string[]) {
    urls.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }

  React.useEffect(() => {
    getExchangeRates().then((data) => {
      const pinnedCompanies = data
        .filter((item) => pinnedRates.includes(item.company.UniqueID))
        .map((item) => ({
          name: item.company.companyName,
          value: `GHS ${item.dollarRates.sellingRate?.toFixed(2) ?? "00.00"}`,
          id: item.company.UniqueID,
          url: `${window?.location?.origin}/${item.company?.url}`,
          image: item.company?.image,
        }));
      const otherCompanies = data
        .filter((item) => !pinnedRates.includes(item.company.UniqueID))
        .map((item) => ({
          name: item.company.companyName,
          value: `GHS ${item.dollarRates.sellingRate?.toFixed(2) ?? "00.00"}`,
          id: item.company.UniqueID,
          url: `${window?.location?.origin}/${item.company?.url}`,
          image: item.company?.image,
        }));
      setExchangeRateCompaines([...pinnedCompanies, ...otherCompanies]);
      preloadImages(exchangeCompanies.map((company) => company.image));
    });
  }, []);

  React.useEffect(() => {
    getFuelRates().then((data) => {
      const pinnedCompanies = data
        .filter(
          (item) =>
            item?.company?.UniqueID &&
            pinnedFuel.includes(item.company.UniqueID)
        )
        .map((item) => ({
          name: item.company?.companyName,
          value: `GHS ${item.diesel?.toFixed(2) ?? "00.00"}`,
          id: item.company?.UniqueID,
          url: `${window.location.origin}/${item.company?.url}`,
          image: item.company?.image,
        }));
      const otherCompanies = data
        .filter(
          (item) =>
            item?.company?.UniqueID &&
            !pinnedFuel.includes(item.company.UniqueID)
        )
        .map((item) => ({
          name: item.company?.companyName,
          value: `GHS ${item.diesel?.toFixed(2) ?? "00.00"}`,
          id: item.company?.UniqueID,
          url: `${window.location.origin}/${item.company?.url}`,
          image: item.company?.image,
        }));
      setFuelCompaines([...pinnedCompanies, ...otherCompanies]);
      preloadImages(fuelCompanies.map((company) => company.image));
    });
  }, []);

  React.useEffect(() => {
    getAllBlogs().then((data) => {
      setBlogs(
        data.data.topStories.map((item: any) => ({
          title: item.title,
          url: `${window?.location?.origin}/news/${item.slug}`,
        }))
      );
    });
  }, []);

  React.useEffect(() => {
    const yesterday = moment().subtract(1, "day").format("D-M-YYYY");
    getAverage(yesterday).then((data) => {
      const today = moment().format("D-M-YYYY");
      getAverage(today).then((todayData) => {
        setAvg(
          pinnedAver.map((item) => {
            const yesterdayRate = data?.[item]?.sellingRate ?? 0;
            const todayRate = todayData?.[item]?.sellingRate ?? 0;
            const inflation =
              ((todayRate - yesterdayRate) / yesterdayRate) * 100;
            const trend = todayRate > yesterdayRate ? "increase" : "decrease";
            return {
              name: item,
              figure: todayRate,
              inflation: inflation.toFixed(2) + "%",
              inflationDecimal: inflation.toFixed(4),
              trend,
            };
          })
        );
      });
    });
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExchangeCompanies = exchangeCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFuelCompanies = fuelCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // console.log(filteredExchangeCompanies)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    !open && setSearchQuery("");
  }, [open]);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="relative cursor-pointer"
      >
        <div className="rounded-lg p-2 xl:absolute xl:inset-y-0 xl:start-0 xl:flex xl:items-center xl:ps-3">
          <svg
            className="w-4 h-4 text-text-text-placeholder"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input
          type="text"
          className="w-full text-sm ps-[34px] shadow-sm cursor-pointer hidden xl:block h-9 border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-7 rounded-xl focus:!ring-0 focus:!outline-none"
          placeholder="Search...."
          value={searchQuery}
          onSubmit={() => setOpen(!open)}
          onFocus={() => setOpen(!open)}
          onChange={(value) => setSearchQuery(value.target.value)}
        />
        <div className="absolute inset-y-0 end-0 items-center pe-2.5 hidden xl:flex">
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            /
          </kbd>
        </div>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="max-w-[550px] w-full mx-auto">
          <div className="flex w-full items-center justify-between p-2">
            <CommandInput
              placeholder="Search..."
              className="w-full"
              onValueChange={(value) => setSearchQuery(value)}
            />
          </div>
          <CommandList className="h-full">
            {/* {!searchQuery && (
            <CommandGroup>
              <Marquee pauseOnHover pauseOnClick>
                {avg.find((item) => item.name === "averageDollar") ? (
                  <ExchangeRateCard
                    to="USD"
                    data={avg.find((item) => item.name === "averageDollar")}
                  />
                ) : (
                  <div>Loading...</div>
                )}
                {avg.find((item) => item.name === "averageEuro") ? (
                  <ExchangeRateCard
                    to="EUR"
                    data={avg.find((item) => item.name === "averageEuro")}
                  />
                ) : (
                  <div>Loading...</div>
                )}
                {avg.find((item) => item.name === "averagePound") ? (
                  <ExchangeRateCard
                    to="GBP"
                    data={avg.find((item) => item.name === "averagePound")}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </Marquee>
            </CommandGroup>
          )} */}
            {/* Conditional rendering based on searchQuery */}
            {filteredExchangeCompanies.length === 0 &&
            filteredFuelCompanies.length === 0 ? (
              <div className="h-[250px] gap-1 w-full flex flex-col items-center justify-center">
                <NoResults />
                <p className="text-header-h6-semibold">No results</p>
                <p className="text-center text-caption-md-regular max-w-xs leading-[1.34] text-text-text-tertiary">
                  Check your spelling and try again, or search for something
                  different.
                </p>
              </div>
            ) : searchQuery ? (
              <>
                {/* Show filtered Exchange Rates */}
                {filteredExchangeCompanies.length > 0 && (
                  <CommandGroup
                    heading={<span className="text-lg">Exchange Rates</span>}
                    className="py-2"
                  >
                    {filteredExchangeCompanies.map((company, index) => (
                      <Link
                        prefetch
                        href={company.url}
                        key={index}
                        className="cursor-pointer !h-min"
                      >
                        <CommandItem className="!px-3 !mb-2 !py-4 hover:border-blue-500 hover:!bg-blue-50 bg-muted border-muted border w-full h-full rounded-lg items-center justify-between">
                          <div className="inline-flex items-center gap-2">
                            <img
                              src={company.image}
                              className="h-5 w-5 rounded-full"
                              onError={() => (
                                <div className="h-3 w-3 bg-blue-400 rounded-full" />
                              )}
                            />
                            <span className="font-medium">{company.name}</span>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {company.value}
                          </span>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                )}

                {/* Show filtered Fuel Prices */}
                {filteredFuelCompanies.length > 0 && (
                  <CommandGroup
                    heading={<span className="text-lg">Fuel Prices</span>}
                    className="py-2 !mt-1"
                  >
                    {filteredFuelCompanies.slice(0, 3).map((company, index) => (
                      <Link
                        prefetch
                        href={company.url}
                        key={index}
                        className="cursor-pointer !h-min"
                      >
                        <CommandItem className="!px-3 !mb-2 !py-4 hover:border-blue-500 hover:!bg-blue-50 bg-muted border-muted border w-full h-full rounded-lg items-center justify-between">
                          <div className="inline-flex items-center gap-1.5">
                            <img
                              src={company.image}
                              className="h-5 w-5 rounded-full"
                              onError={() => (
                                <div className="h-3 w-3 bg-green-400 rounded-full" />
                              )}
                            />
                            <span className="font-medium">{company.name}</span>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {company.value}
                          </span>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                )}
              </>
            ) : (
              <>
                {/* Trending Exchange Rates */}
                <CommandGroup
                  heading={
                    <div className="inline-flex gap-1.5 items-center text-lg">
                      Trending Exchange Rates{" "}
                      <Flame color="#FF745B" size={16} />
                    </div>
                  }
                  className="py-2"
                >
                  {filteredExchangeCompanies.length > 0 ? (
                    filteredExchangeCompanies
                      .slice(0, 3)
                      .map((company, index) => (
                        <Link
                          prefetch
                          href={company.url}
                          key={index}
                          className="cursor-pointer"
                        >
                          <CommandItem className="!px-3 !mb-2 !py-4 hover:border-blue-500 hover:!bg-blue-50 bg-muted border-muted border w-full h-full rounded-lg items-center justify-between">
                            <div className="inline-flex items-center gap-1.5">
                              <img
                                src={company.image}
                                className="h-5 w-5 rounded-full"
                                onError={() => (
                                  <div className="h-3 w-3 bg-blue-400 rounded-full" />
                                )}
                              />
                              <span className="font-medium">
                                {company.name}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">
                              {company.value}
                            </span>
                          </CommandItem>
                        </Link>
                      ))
                  ) : (
                    <CommandItem
                      key="loading"
                      className="!py-1 !mb-1 items-center justify-between"
                    >
                      <div className="inline-flex items-center gap-1.5">
                        <div className="h-3 w-3 bg-gray-400 rounded-full animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </CommandItem>
                  )}
                </CommandGroup>

                {/* Trending Fuel Prices */}
                <CommandGroup
                  heading={
                    <div className="inline-flex gap-1.5 items-center text-lg">
                      Trending Fuel Prices <Flame color="#FF745B" size={16} />
                    </div>
                  }
                  className="py-2 !mt-1"
                >
                  {filteredFuelCompanies.length > 0 ? (
                    filteredFuelCompanies.slice(0, 3).map((company, index) => (
                      <Link
                        prefetch
                        href={company.url}
                        key={index}
                        className="cursor-pointer"
                      >
                        <CommandItem className="!px-3 !mb-2 !py-4 hover:border-blue-500 hover:!bg-blue-50 bg-muted border-muted border w-full h-full rounded-lg items-center justify-between">
                          <div className="inline-flex items-center gap-1.5">
                            <img
                              src={company.image}
                              className="h-5 w-5 rounded-full"
                              onError={() => (
                                <div className="h-3 w-3 bg-green-400 rounded-full" />
                              )}
                            />
                            <span className="font-medium">{company.name}</span>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {company.value}
                          </span>
                        </CommandItem>
                      </Link>
                    ))
                  ) : (
                    <CommandItem
                      key="loading"
                      className="!py-1 !mb-1 items-center justify-between"
                    >
                      <div className="inline-flex items-center gap-1.5">
                        <div className="h-3 w-3 bg-gray-400 rounded-full animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </CommandItem>
                  )}
                </CommandGroup>
              </>
            )}

            <CommandSeparator />
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
