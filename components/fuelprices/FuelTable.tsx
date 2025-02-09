"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "@medusajs/ui";
import style from "../../assets/styles/fuelprices.module.css";
import Image from "next/image";
import { FaSortDown, FaSortUp, FaRegStar, FaStar } from "react-icons/fa";
import { AverageRateData, IconType, UserDetailsType, fuelRatesType } from "@/utils/types";
import Link from "next/link";
import Calculator from "./Calculator";
import {
  addToWatchList,
  combinedFuelSortingFunction,
  getAverage,
  handleDiesel,
  handlePetrol,
  handlePremium,
  initialFuelSortingFunction,
} from "@/utils/helpers/api";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import AccordionComp from "../accordion/accordion";
import { fuelFaqs } from "@/utils/data";
import moment from "moment";
import urlManager from "@/utils/urlManager";
import { ProgressBarLink } from "@/app/progress-bar";
import DisplayAd from "../home/components/displayAd";
import { replacePlaceholders } from "@/utils/helpers/helperfunctions";
import { TriangleAlert } from "lucide-react";
import { companyIcons, iconColors } from "../Icons/companyIcon";

type Props = {
  rates: fuelRatesType[];
  user: UserDetailsType;
};

const FuelTable = ({ rates, user }: Props) => {
  // console.log('Fuel Table:', rates);

  const [calculatorInput, setCalculatorInput] = useState<number | string>("");
  const [order, setOrder] = useState<"ascending" | "descending">("descending");
  const [fuelType, setFuelType] = useState<"petrol" | "diesel" | "premium">(
    "petrol"
  );
  const [fuelPrices, setFuelPrices] = useState(rates);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(user);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState(true);
  const [ratesValue, setRatesValue] = useState("petrol");
  const [nameSortingOrder, setNameSortingOrder] = useState<
    "ascending" | "descending" | ""
  >("ascending");
  const [currentSort, setCurrentSort] = useState("rates");
  const [threeMonths, setThreeMonths] = useState<AverageRateData | null>(null);
  const [average, setAverage] = useState<AverageRateData | null>(null);
  const today = moment().format("D-M-YYYY");
  const dateThreeMonthsAgo = moment().subtract(3, "months").format("D-M-YYYY");
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(false);
  const [faqs, setFaqs] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getAverage(today);
        // console.log('Average:', data);
        setAverage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRates();
  }, [today]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getAverage(dateThreeMonthsAgo);
        // console.log('3 months Average:', data);
        setThreeMonths(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRates();
  }, [dateThreeMonthsAgo]);

  // const handleChangeOrder = (type: "petrol" | "diesel" | "premium") => {
  //   if (order === "ascending") {
  //     setOrder("descending");
  //   }
  //   if (order === "descending") {
  //     setOrder("ascending");
  //   }
  //   setFuelType(type);
  // };

  // const sortByProperty = useCallback(
  //   (
  //     property: keyof fuelRatesType,
  //     order: "ascending" | "descending" = "ascending"
  //   ): fuelRatesType[] => {
  //     return fuelPrices.slice().sort((a, b) => {
  //       // Use slice to avoid mutating the original array
  //       const aValue = a[property];
  //       const bValue = b[property];

  //       if (aValue === undefined) return order === "ascending" ? 1 : -1;
  //       if (bValue === undefined) return order === "ascending" ? -1 : 1;

  //       if (aValue === null) return order === "ascending" ? 1 : -1;
  //       if (bValue === null) return order === "ascending" ? -1 : 1;

  //       if (aValue < bValue) return order === "ascending" ? -1 : 1;
  //       if (aValue > bValue) return order === "ascending" ? 1 : -1;
  //       return 0;
  //     });
  //   },
  //   [fuelPrices]
  // );

  const handleAddToWatchList = useCallback(
    async (UniqueID: string) => {
      if (userDetails && userDetails?.watchList) {
        try {
          if (userDetails.watchList.includes(UniqueID)) {
            setUserDetails({
              ...userDetails,
              watchList: userDetails.watchList.filter(
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

  const handleCellClick = () => {
    if (!user.email) {
      urlManager.setRedirectUrl();
      replace("/login");
    }
  };

  const handleNameSorting = () => {
    setNameSortingOrder(
      nameSortingOrder === "ascending" ? "descending" : "ascending"
    );
    setCurrentSort("name");
  };

  const itemsPerPage = 10;

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(
    indexOfFirstItem + itemsPerPage,
    fuelPrices?.length
  );

  const sortedRatesData = fuelPrices?.sort((a, b) => {
    return initialFuelSortingFunction(a, b, ratesValue);
  });

  const tempRatesData = sortedRatesData?.slice(0, sortedRatesData.length);

  const currentItems = tempRatesData?.slice(indexOfFirstItem, indexOfLastItem);

  const sortedProduct = currentItems?.sort((a, b) => {
    return combinedFuelSortingFunction(
      a,
      b,
      nameSortingOrder,
      sorting,
      ratesValue,
      currentSort
    );
  });

  console.log('Sorted Product:', sortedProduct);

  const formatNumber = (number: number | null | undefined): string => {
    return number && number > 0
      ? number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : "-";
  };

  const fullTank = (average?.averagePetrol ?? 0) * 50;

  const handlePageChange = (pageNumber: number) => {
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

  const replacements = {
    averagePetrol: average?.averagePetrol ?? 0,
    averageDiesel: average?.averageDiesel ?? 0,
  };

  return (
    <div className="px-spacing-16 gap-spacing-24 lg:px-spacing-96 pb-spacing-32 lg:pb-spacing-64 lg:gap-spacing-32 mt-6">
      <DisplayAd position="top" />

      <div className="sm:flex justify-between items-center flex-initial mb-[20px] gap-3">
        <div>
          <h1 className="text-xl md:text-[25px] md:leading-[32.5px] font-semibold mb-3">
            Today&apos;s Petrol and Diesel Fuel Prices
          </h1>
          <p
            className={`text-[14px] leading-[18px] text-start tracking-normal fill-[#58667e] text-[#58667e] ${text ? "mb-1" : "mb-3"
              }`}
          >
            The average price for ⛽️ Petrol is{" "}
            <span className="font-semibold">
              ₵{formatNumber(average?.averagePetrol)}
            </span>
            , compared to{" "}
            <span className="font-semibold">
              ₵{formatNumber(threeMonths?.averagePetrol)}
            </span>{" "}
            three months ago.
            <span
              onClick={handleText}
              className="ml-1 underline fill-[#808a9d] text-[#808a9d] cursor-pointer"
            >
              {text ? "" : "Read More"}
            </span>
          </p>
          {text && (
            <p className="text-[14px] leading-[18px] text-start tracking-normal fill-[#58667e] text-[#58667e] mb-3">
              Today, it costs{" "}
              <span className="font-semibold">₵{formatNumber(fullTank)}</span>{" "}
              to fill the tank of an average vehicle. Complete your profile to
              see how much it costs to fill the tank for your specific vehicle
              at different fueling stations.
              <br />
              Tap on a company for more details.
              <span
                className="ml-1 underline fill-[#808a9d] text-[#808a9d] cursor-pointer"
                onClick={handleText}
              >
                Read Less
              </span>
            </p>
          )}
        </div>
        <Calculator
          rates={rates}
          setFuelPrices={setFuelPrices}
          calculatorInput={calculatorInput}
          setCalculatorInput={setCalculatorInput}
        />
      </div>

      <div className="mb-5 w-full overflow-x-scroll xl:overflow-x-hidden">
        <Table className="border-b border-black/5">
          <Table.Header className={style["table-header"]}>
            <Table.Row className="border-black/5 ">
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
                  className={`${style["table-item-head-name"]} relative text-[14px] font-semibold`}
                >
                  <span className={style["icon-arrow"]}>
                    {nameSortingOrder === "ascending" ? (
                      <FaSortUp className="-mb-1" />
                    ) : (
                      <FaSortDown className="-mt-1" />
                    )}
                  </span>
                  Name
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell
                className={style["priced-col"]}
                onClick={() =>
                  handlePetrol(
                    setSorting,
                    setRatesValue,
                    sorting,
                    setCurrentSort
                  )
                }
              >
                <div
                  className={`${style["table-item-head"]} relative text-[14px] font-semibold`}
                >
                  <span className={style["icon-arrow"]}>
                    {!sorting ? (
                      <FaSortUp className="-mb-1" />
                    ) : (
                      <FaSortDown className="-mt-1" />
                    )}
                  </span>
                  Petrol
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell
                className={style["priced-col"]}
                onClick={() =>
                  handleDiesel(
                    setSorting,
                    setRatesValue,
                    sorting,
                    setCurrentSort
                  )
                }
              >
                <div
                  className={`${style["table-item-head"]} relative text-[14px] font-semibold`}
                >
                  <span className={style["icon-arrow"]}>
                    {!sorting ? (
                      <FaSortUp className="-mb-1" />
                    ) : (
                      <FaSortDown className="-mt-1" />
                    )}
                  </span>
                  Diesel
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell
                className={`${style["priced-col"]} hidden md:flex md:items-center`}
                onClick={() =>
                  handlePremium(
                    setSorting,
                    setRatesValue,
                    sorting,
                    setCurrentSort
                  )
                }
              >
                <div
                  className={`${style["mid-item-head"]} relative text-[14px] font-semibold`}
                >
                  <span className={style["icon-arrow"]}>
                    {!sorting ? (
                      <FaSortUp className="-mb-1" />
                    ) : (
                      <FaSortDown className="-mt-1" />
                    )}
                  </span>
                  Premium
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* {sortByProperty(fuelType, order)
              .slice(0, showAll ? fuelPrices.length : 10) */}
            {sortedProduct?.map((item, index) => {
              return (
                <Table.Row
                  className={cn(style["rates-row"], "hover:bg-black/[0.02]")}
                  key={item.company?.companyName || `unknown-${index}`} // Fallback to a unique value if companyName is undefined
                >
                  <Table.Cell
                    className={`${style["star-col"]} bg-white lg:bg-transparent`}
                    onClick={() => {
                      if (item.company) {
                        handleAddToWatchList(item.company.UniqueID);
                      }
                    }}
                  >
                    {userDetails &&
                      item.company &&
                      userDetails?.watchList?.includes(item.company.UniqueID) ? (
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
                    {item.company ? (
                      <ProgressBarLink
                        href={`/company/${item.company.url}`}
                      // href={`/company/${item.company.companyName.toLowerCase()}`}
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
                            />
                            <div
                              id={style["fuel-company-name"]}
                              className={style["table-item"]}
                            >
                              <p className="flex items-center font-semibold text-[14px] text-[#4A4949] tracking-wide">
                                <span className="truncate max-w-[120px] sm:max-w-full">{item.company.companyName}</span>
                                {/* {item.company.iconType &&
                                  Object.entries(companyIcons)
                                    .filter(([key]) => item.company?.iconType?.[key as keyof IconType]?.value)
                                    .slice(0, 2)
                                    .map(([key, Icon]) =>
                                      item?.company?.iconType[key as keyof IconType]?.note ? (
                                        <Icon key={key} className="w-[18px] h-[18px]" />
                                      ) : null
                                    )} */}

                                {item.company.iconType &&
                                  Object.entries(companyIcons)
                                    .filter(([key]) => {
                                      const iconData = item?.company?.iconType[key as keyof IconType];
                                      return iconData?.value && [1, 2, 3].includes(iconData.value); // ✅ Only keep icons with values 1, 2, or 3
                                    })
                                    .sort((a, b) => {
                                      const priorityA = item?.company?.iconType[a[0] as keyof IconType]?.value ?? 999;
                                      const priorityB = item?.company?.iconType[b[0] as keyof IconType]?.value ?? 999;
                                      return priorityA - priorityB; // ✅ Sort by lowest value first (1,2,3)
                                    })
                                    .slice(0, 2)
                                    .map(([key, Icon]) => {
                                      const color = iconColors[key];
                                      return (
                                        <Icon
                                          key={key}
                                          className="ml-1 w-[16px] h-[16px]"
                                        // className={`ml-1 w-[18px] h-[18px] ${color.startsWith("#") ? "" : color}`}
                                        // style={color.startsWith("#") ? { fill: color } : {}}
                                        />
                                      );
                                    })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ProgressBarLink>
                    ) : (
                      <div>Unknown Company</div>
                    )}
                  </Table.Cell>
                  <Table.Cell className={style["priced-col"]}>
                    {item.company ? (
                      <ProgressBarLink
                        href={`/company/${item.company.url}`}
                      // href={`/company/${item.company.companyName.toLowerCase()}`}
                      >
                        <div className={style["table-item"]}>
                          <span className="text-[14px] text-[#4A4949] tracking-[1px]">
                            {/* {item.petrol && item.petrol > 0
                              ? item.petrol.toFixed(2)
                              : "-"} */}
                            {formatNumber(item.petrol)}
                          </span>
                          {item.petrolInflation === "increase" ? (
                            <FaSortUp className="text-green-600 -mb-1" />
                          ) : item.petrolInflation === "decrease" ? (
                            <FaSortDown className="text-red-600 -mt-2" />
                          ) : (
                            ""
                          )}
                        </div>
                      </ProgressBarLink>
                    ) : (
                      <div>-</div>
                    )}
                  </Table.Cell>
                  <Table.Cell className={style["priced-col"]}>
                    {item.company ? (
                      <ProgressBarLink
                        href={`/company/${item.company.url}`}
                      // href={`/company/${item.company.companyName.toLowerCase()}`}
                      >
                        <div className={style["table-item"]}>
                          <span className="text-[14px] text-[#4A4949] tracking-[1px]">
                            {/* {item.diesel && item.diesel > 0
                              ? item.diesel.toFixed(2)
                              : "-"} */}
                            {formatNumber(item.diesel)}
                          </span>
                          {item.dieselInflation === "increase" ? (
                            <FaSortUp className="text-green-600 -mb-1" />
                          ) : item.dieselInflation === "decrease" ? (
                            <FaSortDown className="text-red-600 -mt-2" />
                          ) : (
                            ""
                          )}
                        </div>
                      </ProgressBarLink>
                    ) : (
                      <div>-</div>
                    )}
                  </Table.Cell>
                  <Table.Cell
                    className={`${style["priced-col"]} hidden md:block`}
                  >
                    {item.company ? (
                      <ProgressBarLink
                        href={`/company/${item.company.url}`}
                      // href={`/company/${item.company.companyName.toLowerCase()}`}
                      >
                        <div className={style["mid-item"]}>
                          <span className="text-[14px] text-[#4A4949] tracking-[1px]">
                            {/* {item.premium && item.premium > 0
                              ? item.premium.toFixed(2)
                              : "-"} */}
                            {formatNumber(item.premium)}
                          </span>
                          {item.premiumInflation === "increase" ? (
                            <FaSortUp className="text-green-600 -mb-1" />
                          ) : item.premiumInflation === "decrease" ? (
                            <FaSortDown className="text-red-600 -mt-2" />
                          ) : (
                            ""
                          )}
                        </div>
                      </ProgressBarLink>
                    ) : (
                      <div>-</div>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>

      <Pagination className="mt-6 mb-6">
        <PaginationContent>
          <PaginationItem
            className={`${currentPage === 1 && "pointer-events-none opacity-50"
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <PaginationPrevious className="border-none !text-icon-icon-secondary hover:bg-background-bg-secondary-hover" />
          </PaginationItem>
          {Array.from(
            { length: Math.ceil(fuelPrices?.length / itemsPerPage) },
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                // className={` hover:bg-primary hover:text-white ${currentPage === index + 1 ? "text-white" : "text-black"}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem
            className={`${currentPage === Math.ceil(fuelPrices?.length / itemsPerPage)
              ? "pointer-events-none opacity-50"
              : ""
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <PaginationNext className="border-none !text-icon-icon-secondary hover:bg-background-bg-secondary-hover" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
            {fuelFaqs.map((item) => (
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
            {fuelFaqs.map((item) => (
              <h2 key={item.value}>{item.question}</h2>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FuelTable;
