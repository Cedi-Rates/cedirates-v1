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
import { ProgressBarLink } from "@/app/progress-bar";
import { getAverage, getFuelRates } from "@/utils/helpers/api";
import { getRandomFuelStations } from "@/utils/helpers/helperfunctions";
import { AverageRateData } from "@/utils/types";
import moment from "moment";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { FaSortDown, FaSortUp } from "react-icons/fa";

interface Company {
  companyName: string;
  image: string;
  subCategory: string;
}

interface FuelData {
  company: Company;
  petrol?: number | null;
  diesel?: number | null;
  petrolInflation: any;
  dieselInflation: any;
  premium?: number | null;
}

interface Props {
  className?: String;
}

interface FuelRatesType {
  company?: Company; // Optional, might be undefined
  petrol?: number | null;
  diesel?: number | null;
  petrolInflation?: any;
  dieselInflation?: any;
  premium?: number | null;
}

const FuelRatesCard: React.FC<Props> = (className) => {
  const [randomData, setRandomData] = useState<FuelData[]>([]);
  const [average, setAverage] = useState<AverageRateData | null>(null);
  const today = moment().format("D-M-YYYY");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getAverage(today);
        // console.log('Average Data:', data)
        setAverage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRates();
  }, [today]);

  function transformToFuelData(rates: any){
    return rates.map((rate: { [key: string]: any }) => ({
      company: rate.company || {
        companyName: "Unknown",
        image: "/path/to/default/image.jpg",
        subCategory: "Unknown",
      },
      petrol: rate.petrol ?? null,
      diesel: rate.diesel ?? null,
      premium: rate.premium ?? null,
      dieselInflation: rate.dieselInflation ?? '',
      petrolInflation: rate.petrolInflation ?? ''
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await getFuelRates();
        const data = transformToFuelData(getRandomFuelStations(rates));
        setRandomData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card
      className={`${style.rateCard} !h-full flex flex-col ${className.className}`}
    >
      <ProgressBarLink
        href="/fuel-prices/gh"
        className="flex flex-col justify-between"
        prefetch={true}
      >
        <div className="flex justify-between items-center py-2 sm:py-5 pl-1.5">
          <h2 className="text-paragraph-md-bold font-gellix-semibold">
            Fuel Prices
          </h2>
          <Button variant="ghost" size={"sm"}>
            See More <ArrowRight size={16} />
          </Button>
        </div>
        <CardContent className="px-0">
          <Table className="rounded-t-lg overflow-hidden">
            <TableHeader className="bg-[#f6f6f6]">
              <TableRow className={`${style["table-header"]} border-[#f5f5f5]`}>
                <TableHead className={style["first-col"]}>
                  <div
                    className={`text-black ${style["table-item-head-name"]} text-[14px]`}
                  >
                    Name
                  </div>
                </TableHead>
                <TableHead className={`${style["priced-col"]} !pl-0 !w-min`}>
                  <div
                    className={`text-black !w-full sm:pl-auto !pl-0`}
                  >
                    Petrol
                  </div>
                </TableHead>
                <TableHead className={`${style["priced-col"]}`}>
                  <div
                    className={`text-black !w-min text-[14px]`}
                  >
                    Diesel
                  </div>
                </TableHead>
                {/* <TableHead className={`${style["priced-col"]}`}>
                  <div
                    className={`${style["table-item-head"]} text-[14px] md:text-[15px]`}
                  >
                    Premium
                  </div>
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody className="border-b border-[#f5f5f5]">
              {randomData.length >= 1 ? (
                randomData.map((item, index) => (
                  <TableRow key={index} className="border-[#f5f5f5]">
                    <TableCell
                      className={`!py-2 !max-h-min min-h-[min-content]`}
                    >
                      <div className="gap-2 h-[3rem] inline-flex items-center">
                        <Image
                          src={item.company.image}
                          alt={item.company.companyName}
                          height={30}
                          width={30}
                          className="rounded-full"
                        />
                        <span>
                          <p className="font-semibold text-[14px] text-[#4A4949] tracking-wide text-nowrap">
                            {item.company.companyName}
                          </p>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`sm:pl-auto !pl-0 !py-2`}>
                      <div className={`inline-flex justify-center text-center`}>
                        {item.petrol && item.petrol > 0
                          ? item.petrol?.toFixed(2)
                          : "-"}
                           {item.petrolInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item.petrolInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                      </div>
                    </TableCell>
                    <TableCell className={`!py-2`}>
                      <div className={`inline-flex justify-center text-center`}>
                        {item.diesel && item.diesel > 0
                          ? item.diesel?.toFixed(2)
                          : "-"}
                          {item.dieselInflation ===
                              "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item.dieselInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                      </div>
                    </TableCell>
                    {/* <TableCell className={style["priced-col"]}>
                    <div className={style["table-item"]}>
                      {item.premium && item.premium > 0
                        ? item.premium?.toFixed(2)
                        : "-"}
                    </div>
                  </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index} className={style["rates-row"]}>
                      <TableCell
                        className={`${style["first-col"]} !py-2 sm:pr-auto !pr-0`}
                      >
                        <div>
                          <div
                            className={`${style["name-col"]} inline-flex items-center`}
                          >
                            <Skeleton className="h-[30px] w-[30px] rounded-full" />
                            <span>
                              <Skeleton className="h-[14px] w-[80px]" />
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`${style["priced-col"]} sm:pl-auto !pl-0 !py-2`}
                      >
                        <Skeleton className="h-[14px] !w-[58px]" />
                      </TableCell>
                      <TableCell className={`${style["priced-col"]} !py-2`}>
                        <Skeleton className="h-[14px] !w-[50px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="px-1 my-4 font-semibold">
          <p className="text-sm">
            Fill your tank at{" "}
            <span className="text-primary font-bold">
              ₵{average?.averagePetrol}
            </span>{" "}
            per litre
          </p>
        </CardFooter>
      </ProgressBarLink>
    </Card>
  );
};

export default FuelRatesCard;
