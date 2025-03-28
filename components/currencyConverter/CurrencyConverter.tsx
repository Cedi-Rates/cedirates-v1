"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/assets/styles/currencyConverter.module.css";
import getChartData, {
  convertCurrency,
  todayAverage,
  currencies,
  getAverageForToday,
  isConversionSupported,
} from "@/utils/currencyConverterFunc";
import NavbarLight from "@/components/navbar/NavbarLight";
import moment from "moment";
import dynamic from "next/dynamic";
import Form from "./components/form";
import Tables from "./components/tables";
import { Skeleton } from "@/components/ui/skeleton";
import FAQ from "@/components/currencyConverter/components/faq";
import { DateRange } from "react-day-picker";
import Footer from "@/components/footer";
import { exchangeFaqs } from "@/utils/data";
import { useToast } from "../ui/use-toast";
import ConverterBox from "./components/currency-converter";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

moment.suppressDeprecationWarnings = true;

const DynamicComponent = dynamic(() => import("./components/tradeview-chart"), {
  ssr: false,
});

const CurrencyConverter = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("0");
  const [amountWithCommas, setAmountWithCommas] = useState<string>();
  const [to, setTo] = useState<any>(currencies[0]);
  const [from, setFrom] = useState<any>(currencies[1]);
  const [finalPrice, setFinalPrice] = useState<any>();
  const [isClosed, setClosed] = useState<Boolean>(true);
  const [priceHeight, setPriceHeight] = useState<number>();
  const [state, setState] = useState<any>();
  const [ERD, setERD] = useState<any>();
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });
  const [isMobile, setMobile] = useState<Boolean>();
  const [isTablet, setTablet] = useState<Boolean>();
  const [faqs, setFaqs] = useState(false);
  const now = new Date();
  const [currentRange, setCurrentRange] = useState<any>({
    from: new Date(now.setDate(now.getDate() - 30)),
    to: new Date(),
  });
  const [currencyName, setCurrencyName] = useState<any>(
    to.shortName === "ghs" ? from.shortName : to.shortName
  );

  //New Currency Converter
  const router = useRouter();
  const searchParams = useSearchParams();

  const [amount1, setAmount1] = useState(() => {
    const paramAmount = searchParams.get("Amount");
    if (paramAmount) {
      return paramAmount;
    }
    const savedAmount =
      typeof window !== "undefined"
        ? localStorage.getItem("converter_amount")
        : null;
    return savedAmount || 500;
  });

  const [amount2, setAmount2] = React.useState<string | number>("");
  const [currency1, setCurrency1] = useState(
    () => searchParams.get("From") || "USD"
  );
  const [currency2, setCurrency2] = useState(
    () => searchParams.get("To") || "GHS"
  );
  const [rateType, setRateType] = useState(
    () => searchParams.get("Rate") || "CediRates Average"
  );

  // Save amount1 to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("converter_amount", amount1.toString());
    }
  }, [amount1]);

  // Update URL and title when conversion values change
  useEffect(() => {
    if (amount1 && currency1 && currency2 && rateType) {
      // Update URL with search params, removing commas from amount
      const params = new URLSearchParams();
      params.set("Amount", amount1.toString().replace(/,/g, ""));
      params.set("From", currency1);
      params.set("To", currency2);
      params.set("Rate", rateType);

      // Update URL without page reload
      router.push(`/currency-converter/?${params.toString()}`);
    }
  }, [amount1, currency1, currency2, rateType, router]);

  const fetchData = async () => {
    const todaysAverage = await getAverageForToday(moment().format("D-M-YYYY"));
    if (todaysAverage) {
      setERD(todayAverage.data);
    }
  };

  const fetchChartData = async () => {
    const chartsData = await getChartData(to, from, ERD, currentRange);
    if (chartsData) {
      setState(chartsData);
    }
  };

  useEffect(() => {
    if (document.documentElement.clientWidth <= 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if (document.documentElement.clientWidth <= 700) {
      setTablet(true);
    } else {
      setTablet(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (ERD) {
      fetchChartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ERD, dateRange, to, from, currentRange]);

  useEffect(() => {
    if (!isClosed) {
      setFinalPrice(convertCurrency(amount, from, to, ERD));
    }
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosed, amount, from, to]);

  // useEffect(() => {
  //   if (!isConversionSupported(from, to)) {
  //     toast({
  //       title: "Oops! We don't convert this currency pair yet 😅",
  //     });
  //   }
  // }, [from, to, toast]);

  // const priceRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (ERD) {
  //     if (priceRef.current) {
  //       priceRef.current.style.height = isClosed
  //         ? "0"
  //         : priceRef.current.scrollHeight + "px";
  //     }
  //     !isMobile
  //       ? setPriceHeight(160 + (priceRef.current?.scrollHeight ?? 0) / 2)
  //       : setPriceHeight(300 + (priceRef.current?.scrollHeight ?? 0) / 2);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isClosed, ERD]);

  // const addCommasAndSave = (value: any) => {
  //   const inputVal = value.target.value.replace(/[^0-9.]/g, "");
  //   setAmount(inputVal);
  //   const formattedVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   setAmountWithCommas(formattedVal);
  // };

  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (isConversionSupported(from, to)) {
  //     setClosed(false);
  //     setFinalPrice(convertCurrency(amount, from, to, ERD));
  //   } else {
  //     toast({
  //       title: "Oops! We don't convert this currency pair yet 😅",
  //     });
  //   }
  // };

  // const handleDateChange = (range: DateRange | undefined) => {
  //   setDateRange({
  //     from: range?.from ?? null,
  //     to: range?.to ?? null,
  //   });
  // };

  const handleFaqs = () => {
    setFaqs(!faqs);
  };

  return (
    <main className={styles.main}>
      {/* <NavbarLight /> */}
      <div className={styles.container}>
        <div className={styles.div1}>
          <p className={styles.h1}>
            {/* Convert from {from.fullName} to {to.fullName} */}
            {amount1 === "" && currency1 === "" && currency2 === ""
              ? `Convert from ${from.fullName} to ${to.fullName}`
              : `${amount1} ${currency1} to ${currency2} - Convert ${getCurrencyFullName(
                  currency1
                )} to ${getCurrencyFullName(currency2)}`}
          </p>
        </div>
        {/* <Form
          ERD={ERD}
          onSubmit={onSubmit}
          amountWithCommas={amountWithCommas}
          setAmountWithCommas={setAmountWithCommas}
          to={to}
          isClosed={isClosed}
          priceRef={priceRef}
          addCommasAndSave={addCommasAndSave}
          amount={amount}
          setAmount={setAmount}
          setFrom={setFrom}
          setTo={setTo}
          finalPrice={finalPrice}
          from={from}
          isTablet={isTablet}
          setCurrencyName={setCurrencyName}
        /> */}
        <ConverterBox
          ERD={ERD}
          amount1={amount1}
          amount2={amount2}
          currency1={currency1}
          currency2={currency2}
          setAmount1={setAmount1}
          setAmount2={setAmount2}
          setCurrency1={setCurrency1}
          setCurrency2={setCurrency2}
          rateType={rateType}
          setRateType={setRateType}
        />
        <div
          className={styles.div2}
          // style={{
          //   paddingTop: !isMobile
          //     ? isClosed
          //       ? "60px"
          //       : `${priceHeight}px`
          //     : isClosed
          //     ? "50px"
          //     : `${priceHeight}px`,
          // }}
        >
          <Tables from={from} to={to} ERD={ERD} />
          {state ? (
            <DynamicComponent
              state={state}
              currentRange={currentRange}
              setCurrentRange={setCurrentRange}
              to={to}
              setTo={setTo}
              from={from}
              setFrom={setFrom}
              currencyName={currencyName}
              setCurrencyName={setCurrencyName}
            />
          ) : (
            <Skeleton className="w-full h-[350px] rounded-xl" />
          )}
          <div className="mb-10 px-[10px] sm:px-[20px] md:px-[30px] lg:px-[35px] xl:px-0">
            <p className="text-[16px] leading-[18px] text-start tracking-normal mb-6">
              Frequently Asked Questions.
              <span
                onClick={handleFaqs}
                className="ml-1 underline fill-[#808a9d] text-[#808a9d] cursor-pointer font-medium"
              >
                {faqs ? "Hide" : "Show"}
              </span>
            </p>
            {faqs && (
              <div>
                {exchangeFaqs.map((item) => (
                  <div className="mb-5" key={item.value}>
                    <h2 className="fill-[#0d1421] text-[16px] mb-2 font-semibold">
                      {item.question}
                    </h2>
                    <p className="fill-[#58667e] text-[#58667e] text-[14px] text-start tracking-normal">
                      {item.answer}
                    </p>
                  </div>
                ))}
                <span
                  className="font-semibold text-[16px] underline fill-[#1893fa] text-[#1893fa] cursor-pointer"
                  onClick={handleFaqs}
                >
                  Hide
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CurrencyConverter;

const getCurrencyFullName = (code: string) => {
  // Map currency codes to full names
  const currencyNames: Record<string, string> = {
    USD: "US Dollar",
    GBP: "British Pound",
    EUR: "Euro",
    // Add other currencies as needed
  };
  return currencyNames[code] || code;
};
