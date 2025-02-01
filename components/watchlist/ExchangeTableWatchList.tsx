"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "@medusajs/ui";
import style from "../../assets/styles/fuelprices.module.css";
import Image from "next/image";
import { FaSortDown, FaSortUp, FaRegStar, FaStar } from "react-icons/fa";
import {
  AverageRateData,
  UserDetailsType,
  exchangeRatesType,
} from "@/utils/types";
import Calculator from "../exchangeRates/Calculator";
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
} from "@/utils/helpers/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { cn } from "@/lib/utils";
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
import urlManager from "@/utils/urlManager";
import { ProgressBarLink } from "@/app/progress-bar";
import { replacePlaceholders } from "@/utils/helpers/helperfunctions";
import { EmptyState } from "../ui/empty-state-watchlist-tables";

type Props = {
  rates: exchangeRatesType[];
  user: UserDetailsType | null;
  categoryHeading?: string;
};

const ExchangeTable = ({ rates, user }: Props) => {
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
        } catch (error) {}
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

  // const filteredRatesData = exchangeRates?.filter((item) =>
  //   activeSubcategory
  //     ? item.company.subCategory
  //       .toLowerCase()
  //       .includes(activeSubcategory.toLowerCase())
  //     : true
  // );

  useEffect(() => {
    setExchangeRates(rates);
  }, [rates]);

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
    if (a.company?.companyName === "LemFi") return -1;
    if (b.company?.companyName === "LemFi") return 1;
    if (a.company?.companyName === "Afriex") return -1;
    if (b.company?.companyName === "Afriex") return 1;
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
    if (a.company?.companyName === "LemFi") return -1;
    if (b.company?.companyName === "LemFi") return 1;
    if (a.company?.companyName === "Afriex") return -1;
    if (b.company?.companyName === "Afriex") return 1;

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
    // <div className="px-spacing-16 gap-spacing-24 lg:px-spacing-96 pb-spacing-32 lg:pb-spacing-64 lg:gap-spacing-32 mt-6">
    <>
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
                                  <p className="font-semibold text-[14px] text-[#4A4949] tracking-wide text-nowrap truncate w-[120px] sm:w-auto">
                                    {item.company.companyName}
                                  </p>
                                  {/* {(item.company?.companyName === "LemFi" ||
                                    item.company?.companyName === "Afriex") && (
                                    <p className="bg-[#87c1fd] text-white py-[0.1px] px-[2px] rounded-[5px] w-[32px] text-[11px] flex justify-center relative left-[5px]">
                                      Ad
                                    </p>
                                  )} */}
                                  <p className="font-light text-[#818181] text-[10px] tracking-wide">
                                    {item.company.subCategory}
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
              className={`${
                currentPage === 1 && "pointer-events-none opacity-50"
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
              className={`${
                currentPage ===
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
      {/* </div> */}
    </>
  );
};

export default ExchangeTable;
