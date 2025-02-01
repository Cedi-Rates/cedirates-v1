"use client";
import React, { useEffect, useState } from "react";
import style from "../../assets/styles/exchangerates.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressBarLink } from "@/app/progress-bar";
import { generateSeoContent, updateMetadata } from "@/utils/helpers/helperfunctions";

type Props = {
  setCurrencyType: React.Dispatch<
    React.SetStateAction<"dollarRates" | "euroRates" | "poundRates">
  >;
  currencyType: "dollarRates" | "euroRates" | "poundRates";
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const CurrencyTabs = ({
  setCurrencyType,
  currencyType,
  setCurrency,
  setCurrentPage,
}: Props) => {
  const [activeLink, setActiveLink] = useState("");
  const [subCat, setSubCat] = useState("");

  const handleClick = (
    type: "dollarRates" | "euroRates" | "poundRates",
    currency: string,
    currencyPair: "gbp-to-ghs" | "usd-to-ghs" | "eur-to-ghs"
  ) => {
    setCurrencyType(type);
    setCurrency(currency);

    const newUrl = subCat
      ? `${activeLink}/${currencyPair}/${subCat}/`
      : `${activeLink}/${currencyPair}/`;
    setCurrentPage(Number(1));
    window.history.pushState(null, "", newUrl);

    const { title, description } = generateSeoContent(subCat, currency)
    updateMetadata(title, description, window.location.href);
  };

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("gbp-to-ghs")) {
      setCurrencyType("poundRates");
      setCurrency("gbp");
    } else if (pathname.includes("eur-to-ghs")) {
      setCurrencyType("euroRates");
      setCurrency("eur");
    } else {
      setCurrencyType("dollarRates");
      setCurrency("");
    }
  }, [pathname, setCurrencyType, setCurrency]);

  useEffect(() => {
    const temp = pathname.toLowerCase().split("/");

    if (temp.length > 2) {
      setSubCat(temp[3]);
      if (!temp[3]) {
        setSubCat("");
      }
      if (
        temp[2] !== "gbp-to-ghs" &&
        temp[2] !== "eur-to-ghs" &&
        temp[2] !== "usd-to-ghs"
      ) {
        setActiveLink("/" + temp[1] + "/" + temp[2]);
      } else setActiveLink(`/${temp[1]}`);
    } else {
      setActiveLink(`/${temp[1]}`);
    }
  }, [pathname]);

  return (
    <div className="uppercase text-[.9rem] inline-flex p-[4px] bg-background-bg-secondary rounded-radius-md">
      <div
        onClick={() => handleClick("dollarRates", "", "usd-to-ghs")}
        className={`cursor-pointer px-2 py-1 relative z-20 hover:text-black ${currencyType === "dollarRates" ? "text-black" : "text-black/40"
          }`}
      >
        {currencyType === "dollarRates" && (
          <motion.div
            layoutId="rates"
            transition={{ duration: 0.2 }}
            className="cursor-pointer px-4 py-1 h-full  absolute top-0 left-0 -z-10 w-full  bg-white rounded-[6px] shadow-[0_4px_10px_#00000010] "
          />
        )}

        <span className={style["desktop-tab-item"]}>Dollar</span>
        <span className={style["mobile-tab-item"]}>USD</span>
      </div>
      <div
        onClick={() => handleClick("poundRates", "gbp", "gbp-to-ghs")}
        className={`cursor-pointer px-2 py-1 relative z-20 hover:text-black ${currencyType === "poundRates" ? "text-black" : "text-black/40"
          }`}
      >
        {currencyType === "poundRates" && (
          <motion.div
            layoutId="rates"
            transition={{ duration: 0.2 }}
            className="cursor-pointer px-5 py-1 h-full  absolute top-0 left-0 -z-10 w-full  bg-white rounded-[6px] shadow-[0_4px_10px_#00000010] "
          />
        )}

        <span className={style["desktop-tab-item"]}>Pound</span>
        <span className={style["mobile-tab-item"]}>GBP</span>
      </div>
      <div
        onClick={() => handleClick("euroRates", "eur", "eur-to-ghs")}
        className={`cursor-pointer px-2 py-1 relative z-20 hover:text-black ${currencyType === "euroRates" ? "text-black" : "text-black/40"
          }`}
      >
        {currencyType === "euroRates" && (
          <motion.div
            layoutId="rates"
            transition={{ duration: 0.2 }}
            className="cursor-pointer px-5 py-1 h-full  absolute top-0 left-0 -z-10 w-full  bg-white rounded-[6px] shadow-[0_4px_10px_#00000010] "
          />
        )}

        <span className={style["desktop-tab-item"]}>Euro</span>
        <span className={style["mobile-tab-item"]}>EUR</span>
      </div>
    </div>
  );
};

export default CurrencyTabs;
