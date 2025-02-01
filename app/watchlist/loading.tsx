import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import style from "../../assets/styles/exchangerates.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsCalculator, BsInfo } from "react-icons/bs";
import DisplayAd from "@/components/home/components/displayAd";
import Header from "@/components/navbar/Header";
import InfoTooltip from "@/components/ui/info-tooltip";
import { MobileNav } from "@/components/mobile-nav";

interface LoadingProps {
  user: any;
}

export function Loading({ user }: LoadingProps) {
  return (
    <>
      <Header />

      <main className="max-w-[1450px] mx-auto px-spacing-16 lg:px-spacing-96 mt-6">
        <DisplayAd position="top" />
        <div className="mb-[20px]">
          <Skeleton className=" h-[30px] w-[auto] max-w-[350px] mb-4 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] " />
          <div className="mb-[20px]">
            <Skeleton className=" h-[30px]  w-[100%]  md:max-w-[450px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] " />
          </div>
        </div>
        <div className="mb-0">
          <div className="">
            <div className="mb-0 sm:flex justify-between items-center flex-initial gap-3">
              <Skeleton className=" h-[30px] w-[200px] max-w-[300px] mb-4 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] " />
              <div>
                <Calculator />
              </div>
            </div>
            <Skeleton className=" h-[30px] w-full md:w-[750px] mb-4 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          </div>
        </div>

        <Table className="border-b border-[#f5f5f5]">
          <TableHeader className={style["table-header"]}>
            <TableRow className="border-[#f5f5f5]">
              {/* <TableHead className={style["star-col"]}>
              <Skeleton className=" h-[20px] w-[50px]   bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]  rounded-3xl" />
            </TableHead> */}
              <TableHead className=" relative left-5">
                <Skeleton className=" h-[20px] w-[50px]   bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]  rounded-md" />
              </TableHead>
              {Array.from({ length: 3 }).map((_, index) => {
                return (
                  <TableHead className={style["priced-col"]} key={index}>
                    <Skeleton className=" h-[20px] w-[50px]   bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]  rounded-md" />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  {/* <TableCell key={index} className="">
                </TableCell> */}
                  <TableCell key={index} className="flex items-center gap-1">
                    <Skeleton className=" h-[15px] w-[15px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] rounded-md" />
                    <Skeleton className=" h-[40px] w-[40px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] rounded-full ml-2" />
                    <div>
                      <Skeleton className=" h-[20px] w-[60px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] rounded-md mb-1" />
                      <Skeleton className=" h-[10px] w-[60px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] rounded-md" />
                    </div>
                  </TableCell>
                  {Array.from({ length: 3 }).map((_, index) => {
                    return (
                      <TableCell key={index} className={style["priced-col"]}>
                        <Skeleton className=" h-[20px] w-[50px]  bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]  rounded-md" />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-center mb-6 mt-5">
          <Skeleton className=" h-[91px] w-[100%] max-w-[729px] bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)] " />
        </div>

        <MobileNav user={user}/>
      </main>
    </>
  );
}

export default Loading;

const CurrencyTabs = () => {
  const currencyType = "dollarRates";

  return (
    <div className="uppercase text-[.9rem] inline-flex p-[4px] bg-black/5 rounded-[9px]">
      <Link
        href="#"
        className={`cursor-pointer px-2 py-1 relative z-20 hover:text-black text-black bg-white rounded-[6px] shadow-[0_4px_10px_#00000010] `}
      >
        <span className={style["desktop-tab-item"]}>Dollar</span>
        <span className={style["mobile-tab-item"]}>USD</span>
      </Link>
      <Link
        href="#"
        className={`cursor-pointer px-2 py-1 relative z-20 hover:text-black  text-black/40
        `}
      >
        <span className={style["desktop-tab-item"]}>Pound</span>
        <span className={style["mobile-tab-item"]}>GBP</span>
      </Link>
      <Link
        href="#"
        className={`cursor-pointer px-2 py-1 relative z-20 hover:text-black  text-black/40
        `}
      >
        <span className={style["desktop-tab-item"]}>Euro</span>
        <span className={style["mobile-tab-item"]}>EUR</span>
      </Link>
    </div>
  );
};

const Calculator = () => {
  return (
    <div>
      <div className="flex items-center justify-end lg:w-[450px] sm:w-[350px]">
        <div className="relative lg:w-[80%] w-[100%] flex place-items-center h-full">
          <span className="absolute text-[1.5rem] text-black/40 translate-x-1/2 left-1 top-1\2 ">
            <BsCalculator size={18} />
          </span>
          <input
            type="tel"
            placeholder="Enter amount in US Dollars"
            className="rounded-radius-md border-[1px] border-black/5 bg-white shadow-[0_2px_6px_#00000010] h-11 active:outline-none focus:outline-none px-10 text-base font-light w-[100%]"
          />
          <InfoTooltip
            content={
              <p>
                Use advanced{" "}
                <Link
                  href="/currency-converter"
                  className="text-primary underline"
                >
                  Currency Converter
                </Link>{" "}
                to check for any currency.
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};
