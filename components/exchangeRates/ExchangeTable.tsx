"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "@medusajs/ui";
import style from "../../assets/styles/fuelprices.module.css";
import Image from "next/image";
import { FaSortDown, FaSortUp, FaRegStar, FaStar } from "react-icons/fa";
import {
  AverageRateData,
  TagType,
  UserDetailsType,
  currencyRatesType,
  exchangeRatesType,
} from "@/utils/types";
import Link from "next/link";
import Calculator from "./Calculator";
import CurrencyTabs from "./CurrencyTabs";
import {
  addToWatchList,
  combinedSortingFunction,
  getAverage,
  handleBuying,
  handleMidrate,
  // handleNameSorting,
  handleSelling,
  initialSortingFunction,
  sortingFunction,
} from "@/utils/helpers/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Ad from "../../assets/images/ad.png";
import SubCategory from "./SubCategories";
// import Pagination from "react-js-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TooltipCom from "./components/TooltipCom";
import { handleNameSorting } from "../../utils/helpers/api";
import { cn } from "@/lib/utils";
import { EmptyState } from "../ui/empty-state";
import {
  banksFaqs,
  cardPaymentFaqs,
  cryptoFaqs,
  exchangeFaqs,
  fintechFaqs,
  forexBureausFaqs,
  moneyTransferFaqs,
} from "@/utils/data";
import moment from "moment";
import DisplayAd from "../home/components/displayAd";
import urlManager from "@/utils/urlManager";
import { ProgressBarLink } from "@/app/progress-bar";
import { BadgeCheck, ChevronsLeft, ChevronsRight } from "lucide-react";
import { replacePlaceholders } from "@/utils/helpers/helperfunctions";
import { companyIcons, iconColors } from "../Icons/companyIcon";
import BadgeIcon from "../ui/avatarIcons/badge";

type Props = {
  rates: exchangeRatesType[];
  user: UserDetailsType | null;
  categoryHeading?: string;
};

const ExchangeTable = ({ rates, user }: Props) => {
  console.log("Exchange Rates:", rates);

  const [calculatorInput, setCalculatorInput] = useState<number | string>("");
  const [order, setOrder] = useState<"ascending" | "descending">("descending");
  const [exchangeType, setExchangeType] = useState<
    "buyingRate" | "sellingRate" | "midRate"
  >("buyingRate");
  const [currencyType, setCurrencyType] = useState<
    "dollarRates" | "euroRates" | "poundRates"
  >("dollarRates");
  const [exchangeRates, setExchangeRates] = useState(rates);
  const [currency, setCurrency] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [categoryHeading, setCategoryHeading] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(user);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState(true);
  const [ratesValue, setRatesValue] = useState("Selling");
  const [nameSortingOrder, setNameSortingOrder] = useState<
    "ascending" | "descending" | ""
  >("ascending");
  const [currentSort, setCurrentSort] = useState("rates");
  const [text, setText] = useState(false);
  const [faqs, setFaqs] = useState(false);
  const [threeMonths, setThreeMonths] = useState<AverageRateData | null>(null);
  const [average, setAverage] = useState<AverageRateData | null>(null);
  // const [itemsPerPage, setItemsPerPage] = useState(11);
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const today = moment().format("D-M-YYYY");
  const dateThreeMonthsAgo = moment().subtract(3, "months").format("D-M-YYYY");
  let selectedFaqs = exchangeFaqs;

  useEffect(() => {
    if (activeSubcategory === "Money Transfer") setRatesValue("Buying");
    else setRatesValue("Selling");
  }, [activeSubcategory]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getAverage(dateThreeMonthsAgo);
        setThreeMonths(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRates();
  }, [dateThreeMonthsAgo]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getAverage(today);
        setAverage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRates();
  }, [today]);

  const handleAddToWatchList = useCallback(
    async (UniqueID: string) => {
      if (userDetails && userDetails?.watchList) {
        try {
          if (userDetails.watchList.includes(UniqueID)) {
            setUserDetails({
              ...userDetails,
              watchList: userDetails.watchList?.filter(
                (item) => item !== UniqueID
              ),
            });
          } else {
            setUserDetails({
              ...userDetails,
              watchList: [...userDetails?.watchList, UniqueID],
            });
          }
          await addToWatchList(process.env.BASE_URL!, UniqueID);
        } catch (error) { }
      } else {
        localStorage.setItem("intendedWatchListItem", UniqueID);
        urlManager.setRedirectUrl();
        replace("/login");
      }
    },
    [userDetails, setUserDetails, replace]
  );

  useEffect(() => {
    const intendedWatchListItem = localStorage.getItem("intendedWatchListItem");
    if (intendedWatchListItem && userDetails) {
      handleAddToWatchList(intendedWatchListItem);
      localStorage.removeItem("intendedWatchListItem");
    }
  }, [userDetails, handleAddToWatchList]);

  const handleNameSorting = () => {
    setNameSortingOrder(
      nameSortingOrder === "ascending" ? "descending" : "ascending"
    );
    setCurrentSort("name");
  };

  const filteredRatesData = exchangeRates?.filter((item) => {
    if (activeSubcategory) {
      const subCategory = item.company.subCategory.toLowerCase();
      const selectedSubCategory = activeSubcategory.toLowerCase();

      if (selectedSubCategory === "commercial bank") {
        return (
          subCategory === "commercial bank" || subCategory === "central bank"
        );
      }

      return selectedSubCategory === subCategory;
    }

    return true;
  });

  const itemsPerPage = 10;

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(
    indexOfFirstItem + itemsPerPage,
    filteredRatesData?.length
  );

  const sortedRatesData = filteredRatesData?.sort((a, b) => {
    if (
      activeSubcategory === "Commercial Bank" &&
      a.company?.companyName === "Bank of Ghana"
    )
      return -1;
    if (
      activeSubcategory === "Commercial Bank" &&
      b.company?.companyName === "Bank of Ghana"
    )
      return 1;
    // if (a.company?.companyName === "LemFi") return -1;
    // if (b.company?.companyName === "LemFi") return 1;
    // if (a.company?.companyName === "Afriex") return -1;
    // if (b.company?.companyName === "Afriex") return 1;
    return initialSortingFunction(a, b, ratesValue, currencyType);
  });

  // const tempRatesData = sortedRatesData?.slice(0, sortedRatesData?.length - 1);
  const tempRatesData = sortedRatesData?.slice(0, sortedRatesData?.length);

  const currentItems = tempRatesData
    ?.filter((item) => {
      if (activeSubcategory) {
        const subCategory = item.company.subCategory.toLowerCase();
        const selectedSubCategory = activeSubcategory.toLowerCase();

        // Check if "Commercial Bank" is selected and include "Central Bank"
        if (selectedSubCategory === "commercial bank") {
          return (
            subCategory === "commercial bank" || subCategory === "central bank"
          );
        }

        // For other subcategories, match normally
        return selectedSubCategory === subCategory;
      }

      return true;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  // const currentItems = sortedRatesData?.slice(indexOfFirstItem, indexOfLastItem);

  const sortedProduct = currentItems?.sort((a, b) => {
    if (
      activeSubcategory === "Commercial Bank" &&
      a.company?.companyName === "Bank of Ghana"
    )
      return -1;
    if (
      activeSubcategory === "Commercial Bank" &&
      b.company?.companyName === "Bank of Ghana"
    )
      return 1;
    // if (a.company?.companyName === "LemFi") return -1;
    // if (b.company?.companyName === "LemFi") return 1;
    // if (a.company?.companyName === "Afriex") return -1;
    // if (b.company?.companyName === "Afriex") return 1;

    return combinedSortingFunction(
      a,
      b,
      nameSortingOrder,
      sorting,
      ratesValue,
      currencyType,
      currentSort
    );
  });

  // console.log(sortedProduct, activeSubcategory);

  const formatNumber = (number: number | null | undefined): string => {
    return number && number > 0
      ? new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number)
      : "-";
  };

  const dollarSelling = (average?.averageDollar?.sellingRate ?? 0) * 100;
  const dollarBuying = (average?.averageDollar?.buyingRate ?? 0) * 100;
  const euroSelling = (average?.averageEuro?.sellingRate ?? 0) * 100;
  const poundSelling = (average?.averagePound?.sellingRate ?? 0) * 100;
  const dollarBankSelling =
    (average?.averageBankDollar?.sellingRate ?? 0) * 100;
  const euroBankSelling = (average?.averageBankEuro?.sellingRate ?? 0) * 100;
  const poundBankSelling = (average?.averageBankPound?.sellingRate ?? 0) * 100;
  const dollarForexSelling =
    (average?.averageForexBureauDollar?.sellingRate ?? 0) * 100;
  const euroForexSelling =
    (average?.averageForexBureauEuro?.sellingRate ?? 0) * 100;
  const poundForexSelling =
    (average?.averageForexBureauPound?.sellingRate ?? 0) * 100;
  const dollarPaymentSelling =
    (average?.averagePaymentProcessorDollar?.sellingRate ?? 0) * 100;
  const euroPaymentSelling =
    (average?.averagePaymentProcessorEuro?.sellingRate ?? 0) * 100;
  const poundPaymentSelling =
    (average?.averagePaymentProcessorPound?.sellingRate ?? 0) * 100;
  const dollarCryptoSelling =
    (average?.averageCryptoExchangeDollar?.sellingRate ?? 0) * 100;

  const dollarFintechBuying =
    (average?.averageFintechDollar?.buyingRate ?? 0) * 100;
  const euroFintechBuying =
    (average?.averageFintechEuro?.buyingRate ?? 0) * 100;
  const poundFintechBuying =
    (average?.averageFintechPound?.buyingRate ?? 0) * 100;
  const dollarRemittanceBuying =
    (average?.averageMoneyTransferDollar?.buyingRate ?? 0) * 100;
  const euroRemittanceBuying =
    (average?.averageMoneyTransferEuro?.buyingRate ?? 0) * 100;
  const poundRemittanceBuying =
    (average?.averageMoneyTransferPound?.buyingRate ?? 0) * 100;

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (pageNumber !== 1) {
      const newUrl = `${pathname}?page=${pageNumber}`;
      window.history.pushState(null, "", newUrl);
    } else {
      // push(pathname);
      window.history.pushState(null, "", pathname);
    }

    setCurrentPage(pageNumber);
  };

  const handleText = () => {
    setText(!text);
  };

  const handleFaqs = () => {
    setFaqs(!faqs);
  };

  if (activeSubcategory === "Commercial Bank") {
    selectedFaqs = banksFaqs;
  } else if (activeSubcategory === "Payment Processor") {
    selectedFaqs = cardPaymentFaqs;
  } else if (activeSubcategory === "Money Transfer") {
    selectedFaqs = moneyTransferFaqs;
  } else if (activeSubcategory === "Crypto Exchange") {
    selectedFaqs = cryptoFaqs;
  } else if (activeSubcategory === "Fintech") {
    selectedFaqs = fintechFaqs;
  } else if (activeSubcategory === "Forex Bureau") {
    selectedFaqs = forexBureausFaqs;
  }

  const replacements = {
    dollarSelling: average?.averageDollar?.sellingRate ?? "",
    dollarBuying: average?.averageDollar?.buyingRate ?? "",
    dollarBuyingMultiplied: formatNumber(dollarBuying),
    dollarSellingMultiplied: formatNumber(dollarSelling),
    euroSelling: average?.averageEuro?.sellingRate ?? "",
    poundSelling: average?.averagePound?.sellingRate ?? "",
    bankDollarSelling: average?.averageBankDollar?.sellingRate ?? "",
    bankDollarBuying: average?.averageBankDollar?.buyingRate ?? "",
    forexDollarSelling: average?.averageForexBureauDollar?.sellingRate ?? "",
    forexDollarBuying: average?.averageForexBureauDollar?.buyingRate ?? "",
    remittanceDollarBuying:
      average?.averageMoneyTransferDollar?.buyingRate ?? "",
    remittanceBuyingMultiplied: formatNumber(dollarRemittanceBuying),
  };

  useEffect(() => {
    const setCategoryHeadingFunc = () => {
      switch (activeSubcategory) {
        case "Commercial Bank":
          setCategoryHeading("Bank");
          break;
        case "Forex Bureau":
          setCategoryHeading("Forex Bureaus");
          break;
        case "Payment Processor":
          setCategoryHeading("Online Payments");
          break;
        case "Money Transfer":
          setCategoryHeading("Remittance");
          break;
        case "Crypto Exchange":
          setCategoryHeading("Crypto");
          break;
        case "Fintech":
          setCategoryHeading("Fintech");
          break;
        default:
          setCategoryHeading("");
          break;
      }
    };
    setCategoryHeadingFunc();
  }, [activeSubcategory]);

  return (
    <div className="px-spacing-16 gap-spacing-24 lg:px-spacing-96 pb-spacing-32 lg:pb-spacing-64 lg:gap-spacing-32 mt-6">
      <DisplayAd position="top" />

      <div className="">
        <h1 className="text-xl md:text-[25px] md:leading-[32.5px] font-semibold mb-3 md:mb-4">
          Today&apos;s{" "}
          {`${currencyType === "dollarRates"
            ? "Dollar"
            : currencyType === "euroRates"
              ? "Euro"
              : "Pound"
            }`}{" "}
          to Cedi{" "}
          {categoryHeading === "Forex Bureaus"
            ? "Forex Bureau"
            : categoryHeading === "Online Payments"
              ? "Card Payment"
              : categoryHeading === "Remittance"
                ? "Money Transfer"
                : categoryHeading}{" "}
          Exchange Rates
        </h1>
        <p
          className={`text-[14px] leading-[18px] text-start tracking-normal fill-[#58667e] text-[#58667e] ${text ? "mb-1" : "mb-3"
            }`}
        >
          The average{" "}
          {categoryHeading === "Forex Bureaus"
            ? "forex bureau"
            : categoryHeading === "Online Payments"
              ? "card payment"
              : categoryHeading?.toLowerCase()}{" "}
          rate for
          {`${currencyType === "dollarRates"
            ? " 💵 "
            : currencyType === "euroRates"
              ? " 💶 "
              : " 💷 "
            }`}
          <span className="font-semibold">
            {currencyType === "dollarRates"
              ? "$1"
              : currencyType === "euroRates"
                ? "€1"
                : "£1"}{" "}
            is{" "}
          </span>
          <span className="font-semibold">
            {categoryHeading ? (
              <>
                {categoryHeading === "Bank" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(average?.averageBankDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(average?.averageBankEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(average?.averageBankPound?.sellingRate) || 0).toFixed(2)}
                  </>
                )}
                {categoryHeading === "Forex Bureaus" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(average?.averageForexBureauDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(average?.averageForexBureauEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(average?.averageForexBureauPound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Online Payments" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(average?.averagePaymentProcessorDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(average?.averagePaymentProcessorEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(average?.averagePaymentProcessorPound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Crypto" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(average?.averageCryptoExchangeDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(average?.averageCryptoExchangeEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(average?.averageCryptoExchangePound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Remittance" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(average?.averageMoneyTransferDollar?.buyingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(average?.averageMoneyTransferEuro?.buyingRate) || 0).toFixed(2)
                        : (Number(average?.averageMoneyTransferPound?.buyingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Fintech" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(average?.averageFintechDollar?.buyingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(average?.averageFintechEuro?.buyingRate) || 0).toFixed(2)
                        : (Number(average?.averageFintechPound?.buyingRate) || 0).toFixed(2)
                    }
                  </>
                )}
              </>
            ) : (
              <>
                ₵
                {currencyType === "dollarRates"
                  ? (Number(average?.averageDollar?.sellingRate) || 0).toFixed(2)
                  : currencyType === "euroRates"
                    ? (Number(average?.averageEuro?.sellingRate) || 0).toFixed(2)
                    : (Number(average?.averagePound?.sellingRate) || 0).toFixed(2)}
              </>
            )}
          </span>
          , compared to{" "}
          <span className="font-semibold">
            {categoryHeading ? (
              <>
                {categoryHeading === "Bank" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(threeMonths?.averageBankDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(threeMonths?.averageBankEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(threeMonths?.averageBankPound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Forex Bureaus" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(threeMonths?.averageForexBureauDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(threeMonths?.averageForexBureauEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(threeMonths?.averageForexBureauPound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Online Payments" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(threeMonths?.averagePaymentProcessorDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(threeMonths?.averagePaymentProcessorEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(threeMonths?.averagePaymentProcessorPound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Crypto" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(threeMonths?.averageCryptoExchangeDollar?.sellingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(threeMonths?.averageCryptoExchangeEuro?.sellingRate) || 0).toFixed(2)
                        : (Number(threeMonths?.averageCryptoExchangePound?.sellingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Remittance" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(threeMonths?.averageMoneyTransferDollar?.buyingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(threeMonths?.averageMoneyTransferEuro?.buyingRate) || 0).toFixed(2)
                        : (Number(threeMonths?.averageMoneyTransferPound?.buyingRate) || 0).toFixed(2)
                    }
                  </>
                )}
                {categoryHeading === "Fintech" && (
                  <>
                    ₵
                    {currencyType === "dollarRates"
                      ? (Number(threeMonths?.averageFintechDollar?.buyingRate) || 0).toFixed(2)
                      : currencyType === "euroRates"
                        ? (Number(threeMonths?.averageFintechEuro?.buyingRate) || 0).toFixed(2)
                        : (Number(threeMonths?.averageFintechPound?.buyingRate) || 0).toFixed(2)}
                  </>
                )}
              </>
            ) : (
              <>
                ₵
                {currencyType === "dollarRates" ? (
                  <>{(Number(threeMonths?.averageDollar?.sellingRate) || 0).toFixed(2)}</>
                ) : currencyType === "euroRates" ? (
                  <>{(Number(threeMonths?.averageEuro?.sellingRate) || 0).toFixed(2)}</>
                ) : (
                  <>{(Number(threeMonths?.averagePound?.sellingRate) || 0).toFixed(2)}</>
                )}
              </>
            )}
          </span>{" "}
          three months ago.{" "}
          <span
            onClick={handleText}
            className="underline fill-[#808a9d] text-[#808a9d] cursor-pointer"
          >
            {text ? "" : "Read More"}
          </span>
        </p>
        {text && (
          <p className="text-[14px] leading-[18px] text-start tracking-normal fill-[#58667e] text-[#58667e] mb-3">
            {categoryHeading === "Online Payments"
              ? "Rates provided are for indicative purposes and inclusive of an estimated bank fee."
              : "Rates provided are for indicative and guidance purposes only."}{" "}
            {categoryHeading === "Remittance" ||
              categoryHeading === "Fintech" ? (
              <>
                Sending{" "}
                <span className="font-semibold">
                  {currencyType === "dollarRates"
                    ? "$"
                    : currencyType === "euroRates"
                      ? "€"
                      : "£"}
                  100
                </span>{" "}
                becomes{" "}
                <span className="font-semibold">
                  {categoryHeading === "Remittance" &&
                    (currencyType === "dollarRates" ? (
                      <>₵{formatNumber(dollarRemittanceBuying)}</>
                    ) : currencyType === "euroRates" ? (
                      <>₵{formatNumber(euroRemittanceBuying)}</>
                    ) : (
                      <>₵{formatNumber(poundRemittanceBuying)}</>
                    ))}

                  {categoryHeading === "Fintech" &&
                    (currencyType === "dollarRates" ? (
                      <>₵{formatNumber(dollarFintechBuying)}</>
                    ) : currencyType === "euroRates" ? (
                      <>₵{formatNumber(euroFintechBuying)}</>
                    ) : (
                      <>₵{formatNumber(poundFintechBuying)}</>
                    ))}
                </span>{" "}
                received.
              </>
            ) : (
              <>
                You need{" "}
                <span className="font-semibold">
                  {categoryHeading ? (
                    <>
                      {categoryHeading === "Bank" && (
                        <>
                          ₵
                          {currencyType === "dollarRates"
                            ? formatNumber(dollarBankSelling)
                            : currencyType === "euroRates"
                              ? formatNumber(euroBankSelling)
                              : formatNumber(poundBankSelling)}
                        </>
                      )}
                      {categoryHeading === "Forex Bureaus" && (
                        <>
                          ₵
                          {currencyType === "dollarRates"
                            ? formatNumber(dollarForexSelling)
                            : currencyType === "euroRates"
                              ? formatNumber(euroForexSelling)
                              : formatNumber(poundForexSelling)}
                        </>
                      )}
                      {categoryHeading === "Online Payments" && (
                        <>
                          ₵
                          {currencyType === "dollarRates"
                            ? formatNumber(dollarPaymentSelling)
                            : currencyType === "euroRates"
                              ? formatNumber(euroPaymentSelling)
                              : formatNumber(poundPaymentSelling)}
                        </>
                      )}
                      {categoryHeading === "Crypto" && (
                        <>
                          ₵
                          {currencyType === "dollarRates"
                            ? formatNumber(dollarCryptoSelling)
                            : currencyType === "euroRates"
                              ? null
                              : null}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      ₵
                      {currencyType === "dollarRates"
                        ? formatNumber(dollarSelling)
                        : currencyType === "euroRates"
                          ? formatNumber(euroSelling)
                          : formatNumber(poundSelling)}
                    </>
                  )}
                </span>{" "}
                to {categoryHeading === "Online Payments" ? "pay" : "get"}{" "}
                <span className="font-semibold">
                  {currencyType === "dollarRates"
                    ? "$"
                    : currencyType === "euroRates"
                      ? "€"
                      : "£"}
                  100
                </span>{" "}
                {categoryHeading && (
                  <>
                    {categoryHeading === "Bank" && "at banks"}
                    {categoryHeading === "Forex Bureaus" && "at forex bureaus"}
                    {categoryHeading === "Online Payments" && "with your card"}
                    {categoryHeading === "Crypto" && "at crypto exchanges"}{" "}
                  </>
                )}
                now.
              </>
            )}{" "}
            {categoryHeading === "Online Payments" ? (
              <>Your bank may impose a different fee for card payments. </>
            ) : categoryHeading === "Remittance" ? (
              <>Rates provided do not include any fees incurred. </>
            ) : (
              <>
                <span className="font-semibold">Buying rate: </span>
                Used for changing{" "}
                {`${currencyType === "dollarRates"
                  ? "Dollars"
                  : currencyType === "euroRates"
                    ? "Euros"
                    : "Pounds"
                  }`}{" "}
                to Cedis. <span className="font-semibold">Selling rate: </span>
                Used for changing Cedis to{" "}
                {`${currencyType === "dollarRates"
                  ? "Dollars"
                  : currencyType === "euroRates"
                    ? "Euros"
                    : "Pounds"
                  }`}
                .{" "}
              </>
            )}
            Tap on any{" "}
            {categoryHeading ? (
              <>
                {categoryHeading === "Bank" && "bank"}
                {categoryHeading === "Forex Bureaus" && "forex bureau"}
                {categoryHeading === "Online Payments" && "payment provider"}
                {categoryHeading === "Crypto" && "crypto exchange"}
                {categoryHeading === "Remittance" && "money transfer operator"}
                {categoryHeading === "Fintech" && "fintech"}
              </>
            ) : (
              "company"
            )}{" "}
            for more details.
            <span
              className="ml-1 underline fill-[#808a9d] text-[#808a9d] cursor-pointer"
              onClick={handleText}
            >
              Read Less
            </span>
          </p>
        )}
      </div>

      <div className="mb-5 mt-4">
        <div className="sm:flex justify-between items-center flex-initial mb-[10px] gap-3">
          <div className="mb-2 sm:mb-0">
            <CurrencyTabs
              setCurrencyType={setCurrencyType}
              currencyType={currencyType}
              setCurrency={setCurrency}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="hidden sm:flex">
            <Calculator
              rates={rates}
              setExchangeRates={setExchangeRates}
              calculatorInput={calculatorInput}
              setCalculatorInput={setCalculatorInput}
              currencyType={currencyType}
              currency={currency}
              setActiveSubcategory={setActiveSubcategory}
            />
          </div>
        </div>

        <div className="mb-4 sm:mb-0">
          <SubCategory
            currency={currency}
            setActiveSubcategory={setActiveSubcategory}
            setCurrentPage={setCurrentPage}
          />

          <div className="sm:hidden">
            <Calculator
              rates={rates}
              setExchangeRates={setExchangeRates}
              calculatorInput={calculatorInput}
              setCalculatorInput={setCalculatorInput}
              currencyType={currencyType}
              currency={currency}
              setActiveSubcategory={setActiveSubcategory}
            />
          </div>
        </div>

        <div className="w-full overflow-x-scroll lg:overflow-x-hidden">
          <Table className="border-b border-black/5">
            <Table.Header className="sticky top-0 z-10">
              <Table.Row className="border-black/5  sticky top-0 z-10">
                <Table.HeaderCell
                  className={`${style["star-col"]} cursor-pointer bg-white lg:bg-transparent pr-0`}
                >
                  <div className={style["table-item-head"]}></div>
                </Table.HeaderCell>
                <Table.HeaderCell
                  className={`${style["first-col"]} cursor-pointer bg-white lg:bg-transparent`}
                  onClick={handleNameSorting}
                >
                  <div
                    className={`${style["table-item-head-name"]} relative text-[14px] md:text-[15px]`}
                  >
                    <span className={style["icon-arrow"]}>
                      {nameSortingOrder === "ascending" ? (
                        <FaSortUp className="-mb-1" />
                      ) : (
                        <FaSortDown className="-mt-1" />
                      )}{" "}
                    </span>
                    Name
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell
                  className={style["priced-col"]}
                  // onClick={() => handleChangeOrder("buyingRate")}
                  onClick={() =>
                    handleBuying(
                      setSorting,
                      setRatesValue,
                      sorting,
                      setCurrentSort
                    )
                  }
                >
                  <div
                    className={`${style["table-item-head"]} relative text-[14px]`}
                  >
                    <span className={style["icon-arrow"]}>
                      {!sorting ? (
                        <FaSortUp className="-mb-1" />
                      ) : (
                        <FaSortDown className="-mt-1" />
                      )}
                    </span>
                    Buying
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell
                  className={style["priced-col"]}
                  // onClick={() => handleChangeOrder("sellingRate")}
                  onClick={() =>
                    handleSelling(
                      setSorting,
                      setRatesValue,
                      sorting,
                      setCurrentSort
                    )
                  }
                >
                  <div
                    className={`${style["table-item-head"]} relative text-[14px]`}
                  >
                    <span className={style["icon-arrow"]}>
                      {!sorting ? (
                        <FaSortUp className="-mb-1" />
                      ) : (
                        <FaSortDown className="-mt-1" />
                      )}{" "}
                    </span>
                    Selling
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell
                  className={`${style["priced-col"]} hidden md:flex md:items-center`}
                  // onClick={() => handleChangeOrder("midRate")}
                  onClick={() =>
                    handleMidrate(
                      setSorting,
                      setRatesValue,
                      sorting,
                      setCurrentSort
                    )
                  }
                >
                  <div
                    className={`${style["mid-item-head"]} relative text-[14px]`}
                  >
                    <span className={style["icon-arrow"]}>
                      {!sorting ? (
                        <FaSortUp className="-mb-1" />
                      ) : (
                        <FaSortDown className="-mt-1" />
                      )}
                    </span>
                    MidRate
                  </div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {sortedProduct?.length === 0 ||
              sortedProduct?.every(
                (item) =>
                  !item[currencyType].buyingRate &&
                  !item[currencyType].sellingRate &&
                  !item[currencyType].midRate
              ) ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              <Table.Body>
                {sortedProduct?.map((item) => {
                  if (
                    item[currencyType].buyingRate ||
                    item[currencyType].sellingRate ||
                    item[currencyType].midRate
                  ) {
                    return (
                      <Table.Row
                        className={cn(
                          style["rates-row"],
                          "hover:bg-black/[0.02]"
                        )}
                        key={item.company.companyName}
                      >
                        <Table.Cell
                          className={`${style["star-col"]} bg-white lg:bg-transparent`}
                          onClick={() =>
                            handleAddToWatchList(item.company.UniqueID)
                          }
                        >
                          {userDetails?.watchList?.includes(
                            item.company.UniqueID
                          ) ? (
                            <span className="cursor-pointer flex">
                              <FaStar color="#1796fe" size={14} />
                            </span>
                          ) : (
                            <span className="cursor-pointer flex">
                              <FaRegStar color="#818181" size={14} />
                            </span>
                          )}
                        </Table.Cell>
                        <Table.Cell className={style["first-col"]}>
                          <ProgressBarLink
                            href={`/company/${item.company.url}`}
                          >
                            <div
                              className={`${style["table-item"]} bg-white lg:bg-transparent`}
                            >
                              <div className={style["name-col"]}>
                                <Image
                                  src={item.company.image}
                                  alt={item.company.companyName}
                                  height={25}
                                  width={25}
                                  priority
                                  style={{ height: "auto" }}
                                />
                                <div className={style["table-item"]}>
                                  <p className="flex items-center gap-1 font-semibold text-[14px] text-[#4A4949] tracking-wide">
                                    <span className="truncate max-w-[120px] sm:max-w-full">
                                      {item.company.companyName}
                                    </span>
                                    {item.company?.verified && (
                                      <BadgeCheck className="text-[#1896FE] w-[14px] h-[14px] flex-shrink-0" />
                                    )}
                                  </p>

                                  {/* {(item.company?.companyName === "LemFi" ||
                                    item.company?.companyName === "Afriex") && (
                                    <p className="bg-[#87c1fd] text-white py-[0.1px] px-[2px] rounded-[5px] w-[32px] text-[11px] flex justify-center relative left-[5px]">
                                      Ad
                                    </p>
                                  )} */}

                                  <p className="flex items-center font-light text-[#818181] text-[10px] tracking-wide">
                                    <span className="">
                                      {item.company.subCategory}
                                    </span>
                                    {item?.company?.tagsType &&
                                      Object.entries(companyIcons)
                                        .filter(([key]) => {
                                          const iconData =
                                            item?.company?.tagsType?.[
                                            key as keyof TagType
                                            ];
                                          if (!iconData) return false;
                                          if (!iconData?.status) return false;

                                          if (
                                            key === "newListing" &&
                                            iconData.date
                                          ) {
                                            const listingDate = new Date(
                                              iconData.date
                                            );
                                            const currentDate = new Date();
                                            const diffDays =
                                              (currentDate.getTime() -
                                                listingDate.getTime()) /
                                              (1000 * 60 * 60 * 24);
                                            return diffDays <= 7;
                                          }
                                          return true;
                                        })
                                        .sort((a, b) => {
                                          const priorityOrder = [
                                            "warning",
                                            "promotion",
                                            "newListing",
                                          ];
                                          if (
                                            a[0] === "newListing" &&
                                            b[0] !== "newListing"
                                          )
                                            return -1;
                                          if (
                                            b[0] === "newListing" &&
                                            a[0] !== "newListing"
                                          )
                                            return -1;
                                          return (
                                            priorityOrder.indexOf(a[0]) -
                                            priorityOrder.indexOf(b[0])
                                          );
                                        })
                                        .slice(0, 1)
                                        .map(([key, Icon]) => (
                                          <Icon
                                            key={key}
                                            className="ml-1 w-[14px] h-[14px]"
                                            color={iconColors[key]}
                                          />
                                        ))}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ProgressBarLink>
                        </Table.Cell>
                        <Table.Cell className={style["priced-col"]}>
                          <ProgressBarLink
                            href={`/company/${item.company.url}`}
                          >
                            <div className={style["table-item"]}>
                              <span className="text-[14px] text-[#4A4949] tracking-[1px]">
                                {/* {item[currencyType].buyingRate &&
                            item[currencyType].buyingRate! > 0
                              ? item[currencyType].buyingRate?.toFixed(2)
                              : "-"} */}
                                {formatNumber(item[currencyType]?.buyingRate)}
                              </span>
                              {item[currencyType].buyingInflation ===
                                "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item[currencyType].buyingInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                            </div>
                          </ProgressBarLink>
                        </Table.Cell>
                        <Table.Cell className={style["priced-col"]}>
                          <ProgressBarLink
                            href={`/company/${item.company.url}`}
                          >
                            <div className={style["table-item"]}>
                              <span className="text-[14px] text-[#4A4949] tracking-[1px]">
                                {/* {item[currencyType].sellingRate &&
                            item[currencyType].sellingRate! > 0
                              ? item[currencyType].sellingRate?.toFixed(2)
                              : "-"} */}
                                {formatNumber(item[currencyType]?.sellingRate)}
                              </span>
                              {item[currencyType].sellingInflation ===
                                "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item[currencyType].sellingInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                            </div>
                          </ProgressBarLink>
                        </Table.Cell>
                        <Table.Cell
                          className={`${style["priced-col"]} hidden md:block`}
                        >
                          <ProgressBarLink
                            href={`/company/${item.company.url}`}
                          >
                            <div className={style["mid-item"]}>
                              <span className="text-[14px] text-[#4A4949] tracking-[1px]">
                                {formatNumber(item[currencyType]?.midRate)}
                              </span>
                              {item[currencyType].midInflation ===
                                "increase" ? (
                                <FaSortUp className="text-green-600 -mb-1" />
                              ) : item[currencyType].midInflation ===
                                "decrease" ? (
                                <FaSortDown className="text-red-600 -mt-2" />
                              ) : (
                                ""
                              )}
                            </div>
                          </ProgressBarLink>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                })}
              </Table.Body>
            )}
          </Table>
        </div>

        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem
              className={`${currentPage === 1 && "pointer-events-none opacity-50"
                }`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <PaginationPrevious className="border-none !text-icon-icon-secondary hover:bg-background-bg-secondary-hover" />
            </PaginationItem>

            {Array.from(
              { length: Math.ceil(filteredRatesData?.length / itemsPerPage) },
              (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {Math.ceil(filteredRatesData?.length / itemsPerPage) > 5 && (
              <PaginationItem>
                <PaginationEllipsis className="h-8 w-8 border rounded-radius-md border-border-border-secondary" />
              </PaginationItem>
            )}

            <PaginationItem
              className={`${currentPage ===
                Math.ceil(filteredRatesData?.length / itemsPerPage) &&
                "pointer-events-none opacity-50"
                }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <PaginationNext className="border-none !text-icon-icon-secondary hover:bg-background-bg-secondary-hover" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="mb-10">
        <p className="text-[16px] leading-[18px] text-start tracking-normal mb-6">
          Frequently Asked Questions.
          <span
            onClick={handleFaqs}
            className="ml-1 underline fill-[#808a9d] text-[#808a9d] cursor-pointer font-medium"
          >
            {faqs ? "Hide" : "Show"}
          </span>
        </p>
        {faqs ? (
          <div>
            {selectedFaqs.map((item) => (
              <div className="mb-5" key={item.value}>
                <h2 className="fill-[#0d1421] text-[16px] mb-2 font-semibold">
                  {item.question}
                </h2>
                <p
                  className="fill-[#58667e] text-[#58667e] text-[14px] text-start tracking-normal"
                  dangerouslySetInnerHTML={{
                    __html: replacePlaceholders(item.answer, replacements),
                  }}
                />
              </div>
            ))}
            <span
              className="font-semibold text-[16px] underline fill-[#1893fa] text-[#1893fa] cursor-pointer"
              onClick={handleFaqs}
            >
              Hide
            </span>
          </div>
        ) : (
          <div className="hidden">
            {selectedFaqs.map((item) => (
              <h2 key={item.value}>{item.question}</h2>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeTable;
