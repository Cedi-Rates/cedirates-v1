"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
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
import ChartComponent from "./components/tradeview-chart";

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
  const [state, setState] = useState<any>(null); // Default to null
  const [ERD, setERD] = useState<any>(null); // Default to null
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });
  const [isMobile, setMobile] = useState<Boolean>();
  const [isTablet, setTablet] = useState<Boolean>();
  const [faqs, setFaqs] = useState(false);

  const fetchData = async () => {
    try {
      const todaysAverage = await getAverageForToday(moment().format("D-M-YYYY"));
    if (todaysAverage) {
      setERD(todayAverage.data);
    }
    } catch (error) {
      console.error("Error fetching today's average rates:", error);
    }
  };

  const fetchChartData = async () => {
    const chartsData = await getChartData(to, from, ERD, dateRange);
    // console.log(chartsData);
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
      if (isConversionSupported(from, to)) {
        fetchChartData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ERD, dateRange, to, from]);

  useEffect(() => {
    if (!isClosed) {
      if (isConversionSupported(from, to)) {
        setFinalPrice(convertCurrency(amount, from, to, ERD));
      }
    }
    if (isConversionSupported(from, to)) {
      fetchChartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosed, amount, from, to]);

  useEffect(() => {
    if (!isConversionSupported(from, to)) {
      toast({
        title: "Oops! We don't convert this currency pair yet 😅",
      });
    }
  }, [from, to, toast]);

  const priceRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ERD) {
      if (priceRef.current) {
        priceRef.current.style.height = isClosed
          ? "0"
          : priceRef.current.scrollHeight + "px";
      }
      !isMobile
        ? setPriceHeight(160 + (priceRef.current?.scrollHeight ?? 0) / 2)
        : setPriceHeight(300 + (priceRef.current?.scrollHeight ?? 0) / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosed, ERD]);

  const addCommasAndSave = (value: any) => {
    const inputVal = value.target.value.replace(/[^0-9.]/g, "");
    setAmount(inputVal);
    const formattedVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setAmountWithCommas(formattedVal);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (isConversionSupported(from, to)) {
      setClosed(false);
      setFinalPrice(convertCurrency(amount, from, to, ERD));
    } else {
      toast({
        title: "Oops! We don't convert this currency pair yet 😅",
      });
    }
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange({
      from: range?.from ?? null,
      to: range?.to ?? null,
    });
  };

  const handleFaqs = () => {
    setFaqs(!faqs);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.div1}>
          <p className={styles.h1}>
            Convert from {from.fullName} to {to.fullName}
          </p>
          <p>CediRates Currency Converter</p>
        </div>
        <Form
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
        />
        <div
          className={styles.div2}
          style={{
            paddingTop: !isMobile
              ? isClosed
                ? "160px"
                : `${priceHeight}px`
              : isClosed
              ? "240px"
              : `${priceHeight}px`,
          }}
        >
          <Tables from={from} to={to} ERD={ERD} />
          <Suspense fallback={<Skeleton className="w-full h-[350px] rounded-xl" />}>
            {state ? (
              <DynamicComponent state={state} />
            ) : (
              <Skeleton className="w-full h-[350px] rounded-xl" />
            )}
          </Suspense>
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
