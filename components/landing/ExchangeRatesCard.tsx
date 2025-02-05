"use client";
import React, { useState, useEffect } from "react";
import style from "../../assets/styles/landing.module.css";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
// import Link from "next/link";
import { getAverage, getExchangeRates } from "@/utils/helpers/api";
import { getRandomRatesCompanies } from "@/utils/helpers/helperfunctions";
import { ProgressBarLink } from "@/app/progress-bar";
import moment from "moment";
import { AverageRateData } from "@/utils/types";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { FaSortDown, FaSortUp } from "react-icons/fa";

interface Company {
  companyName: string;
  image: string;
  subCategory: string;
}

// interface DollarRates {
//   buyingRate?: any;
//   sellingRate?: any;
//   midRate?: any;
//   buyingInflation: any;
//   sellingInflation: any;
// }

interface RateItem {
  company: Company;
  dollarRates: any;
}

interface Props {
  className?: String;
}

const ExchangeRatesCard: React.FC<Props> = ({ className }) => {
  const [rates, setRates] = useState<RateItem[]>([]);
  const [randomData, setRandomData] = useState<RateItem[]>([]);
  const [average, setAverage] = useState<AverageRateData | null>(null);
  const today = moment().format("D-M-YYYY");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getAverage(today);
        // console.log("Average Data:", data);
        setAverage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRates();
  }, [today]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRates = await getExchangeRates();
        setRates(fetchedRates);
        setRandomData(getRandomRatesCompanies(fetchedRates));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className={`${style.rateCard} ${className} !h-full overflow-hidden`}>
      <ProgressBarLink
        href="/exchange-rates/usd-to-ghs/"
        className="flex flex-col flex-1 justify-between"
        prefetch={true}
      >
        <div className="flex justify-between items-center py-2 sm:py-5 pl-1.5">
          <h2 className="text-paragraph-md-bold font-gellix-semibold">
            Exchange Rates (USD)
          </h2>
          <Button variant="ghost" size={"sm"}>
            See More <ArrowRight size={16} />
          </Button>
        </div>
        <CardContent className="px-0">
          <Table
            className={`${style.table} table-auto h-full rounded-t-lg overflow-hidden flex-1`}
          >
            <TableHeader className="bg-[#f6f6f6]">
              <TableRow className={`${style["table-header"]} border-[#f5f5f5]`}>
                <TableHead className={`${style["first-col"]}`}>
                  <div className="text-[14px] text-black">Name</div>
                </TableHead>
                <TableHead
                  className={`${style["priced-col"]} sm:pl-auto !pl-0`}
                >
                  <div className="text-[14px] text-black">Buying</div>
                </TableHead>
                <TableHead
                  className={`${style["priced-col"]}`}
                >
                  <div className="text-[14px] text-black">Selling</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="flex-1 overflow-auto border-b border-[#f5f5f5]">
              {randomData?.length >= 1
                ? randomData?.map((item) => (
                  <TableRow
                    key={item.company.companyName}
                    className="border-[#f5f5f5]"
                  >
                    <TableCell className={`!py-2 sm:pr-auto !pr-0`}>
                      <div
                        className={`gap-2 h-[3rem] inline-flex items-center`}
                      >
                        <Image
                          src={item.company.image}
                          alt={item.company.companyName}
                          height={30}
                          width={30}
                          className="rounded-full"
                        />
                        <span>
                          <p className="text-[14px] font-semibold text-[#4A4949] tracking-wide text-nowrap">
                            {item.company.companyName}
                          </p>
                          <p className="leading-tight text-[#818181] text-[10px] font-light tracking-wide text-nowrap">
                            {item.company.subCategory}
                          </p>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`sm:pl-auto !pl-0 !py-2`}
                    >
                      <div className="inline-flex justify-center items-center text-center">
                        {item.dollarRates.buyingRate !== null &&
                          item.dollarRates.buyingRate > 0
                          ? item.dollarRates.buyingRate.toFixed(2)
                          : "-"}
                          {item.dollarRates?.buyingInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item.dollarRates?.buyingInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                      </div>
                    </TableCell>
                    <TableCell
                      className={`!py-2`}
                    >
                      <div className="inline-flex justify-center items-center text-center">
                        {item.dollarRates.sellingRate !== null &&
                          item.dollarRates.sellingRate > 0
                          ? item.dollarRates.sellingRate.toFixed(2)
                          : "-"}
                           {item.dollarRates?.sellingInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item.dollarRates?.sellingInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
                : Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index} className={style["rates-row"]}>
                    <TableCell
                      className={`${style["first-col"]} !py-2 sm:pr-auto !pr-0`}
                    >
                      <div
                        className={`${style["name-col"]} inline-flex items-center`}
                      >
                        <Skeleton className="h-[30px] w-[30px] rounded-full" />
                        <span>
                          <Skeleton className="h-[14px] w-[80px]" />
                          <Skeleton className="h-[10px] w-[50px]" />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`${style["priced-col"]} sm:pl-auto !pl-0 !py-2`}
                    >
                      <Skeleton className="h-[14px] !w-[60px]" />
                    </TableCell>
                    <TableCell
                      className={`${style["priced-col"]} !py-2`}
                    >
                      <Skeleton className="h-[14px] !w-[50px]" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="px-1 my-4 font-semibold">
          <p className="text-sm">
            Convert <span className="text-primary font-bold">1 US Dollar</span>{" "}
            to Ghanaian Cedis at{" "}
            <span className="text-primary font-bold">
              ₵{average?.averageDollar?.sellingRate}
            </span>
          </p>
        </CardFooter>
      </ProgressBarLink>
    </Card>
  );
};

export default ExchangeRatesCard;
