"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";
import style from "../../assets/styles/exchangerates.module.css";
import { exchangeRatesType } from "@/utils/types";
import { usePathname } from "next/navigation";
import {
  AlignStartVertical,
  BadgeCent,
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Landmark,
  LayoutDashboard,
  Receipt,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import all from "../../assets/images/all.svg";
import forex from "../../assets/images/forex.svg";
import crypto from "../../assets/images/crypto.svg";
import bank from "../../assets/images/bank.svg";
import remittance from "../../assets/images/remittance.svg";
import fintech from "../../assets/images/fintech.svg";
import online from "../../assets/images/online.svg";
import { ProgressBarLink } from "@/app/progress-bar";
import { Button } from "../ui/button";
import { useRouter } from "next/compat/router";
import { generateSeoContent, updateMetadata } from "@/utils/helpers/helperfunctions";

moment.suppressDeprecationWarnings = true;

type Props = {
  setActiveSubcategory: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currency?: string;
};

const subCategories = [
  {
    name: "All",
    value: "",
    link: `/exchange-rates`,
    icon: all,
  },
  {
    name: "Banks",
    value: "Commercial Bank",
    link: `/banks/`,
    icon: Landmark,
  },
  {
    name: "Forex Bureaus",
    value: "Forex Bureau",
    link: `/forex-bureaus/`,
    icon: WalletCards,
  },
  {
    name: "Card Payments",
    value: "Payment Processor",
    link: `/card-payments/`,
    icon: CreditCard,
  },
  {
    name: "Money Transfer",
    value: "Money Transfer",
    link: `/money-transfer/`,
    icon: CircleDollarSign,
  },
  {
    name: "Crypto",
    value: "Crypto Exchange",
    link: `/crypto/`,
    icon: BadgeCent,
  },
  {
    name: "Fintechs",
    value: "Fintech",
    link: `/fintech/`,
    icon: Receipt,
  },
];

const SubCategory = ({ setActiveSubcategory, currency, setCurrentPage }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let path: string;
    if (pathname.includes("usd-to-ghs")) {
      path = pathname.replace("/exchange-rates/usd-to-ghs", "");
    } else if (pathname.includes("eur-to-ghs")) {
      path = pathname.replace("/exchange-rates/eur-to-ghs", "");
    } else if (pathname.includes("gbp-to-ghs")) {
      path = pathname.replace("/exchange-rates/gbp-to-ghs", "");
    } else path = pathname;

    const temp = subCategories.find(
      (item) => item.link.toLowerCase() === path.toLowerCase()
    );

    setActiveSubcategory(temp?.value || "");
  }, [pathname, setActiveSubcategory]);

  const handleSubcategoryClick = (subcategory: (typeof subCategories)[0]) => {
    let newUrl = "";
    if (subcategory.name === "All") {
      newUrl = currency
        ? `${subCategories[0].link}/${currency}-to-ghs/`
        : `${subCategories[0].link}/usd-to-ghs/`;
    } else {
      newUrl = currency
        ? `/exchange-rates/${currency}-to-ghs${subcategory.link}`
        : `/exchange-rates/usd-to-ghs${subcategory.link}`;
    }

    window.history.pushState(null, "", newUrl);
    setActiveSubcategory(subcategory.value);
    setCurrentPage(1);

    const { title, description } = generateSeoContent(subcategory.name, currency);
    updateMetadata(title, description, window.location.href);
  };

  return (
    <div className="mb-[10px] sm:mb-[1px]">
      <div className={style["subCategory-chips"]}>
        <div className="flex">
          {
            <Button
              onClick={() => handleSubcategoryClick(subCategories[0])}
              className={
                pathname === "/exchange-rates/" ||
                  pathname === "/exchange-rates/usd-to-ghs/" ||
                  pathname === "/exchange-rates/eur-to-ghs/" ||
                  pathname === "/exchange-rates/gbp-to-ghs/"
                  ? "mb-2 bg-background-bg-info !text-primary rounded-lg"
                  : ""
              }
              size={"sm"}
              variant={"tabs"}
            >
              <LayoutDashboard size={20} />
              {subCategories[0].name}
            </Button>
          }

          {subCategories.slice(1).map((item) => {
            return (
              <Button
                key={item.name}
                onClick={() => handleSubcategoryClick(item)}
                className={
                  pathname.includes(item.link)
                    ? "mb-2 bg-background-bg-info !text-primary rounded-lg"
                    : ""
                }
                size={"sm"}
                variant={"tabs"}
              >
                <item.icon size={20} />
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
