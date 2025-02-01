import React from "react";
import style from "../../../../assets/styles/exchangerates.module.css";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getExchangeRates, getUser } from "@/utils/helpers/api";
import ExchangeTable from "@/components/exchangeRates/ExchangeTable";
import { cookies } from "next/headers";
import { Metadata } from "next";
import Footer from "@/components/footer";
import og from "@/assets/images/Exchange Rates shrink.png";
import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import Header from "@/components/navbar/Header";

const title = "Dollar to Cedis Card Payment Rates Today";
const content =
  "Compare Card Payment Dollar to Cedi rate for today. Latest exchange rates for Dollars to Cedis using debit or credit cards issued in Ghana, updated on CediRates.";

export const metadata: Metadata = {
  title: title,
  description: content,
  openGraph: {
    title: title,
    description: content,
    images: og.src,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: content,
    site: "@CediRates",
    images: og.src,
  },
  alternates: {
    canonical: "https://cedirates.com/exchange-rates/usd-to-ghs/card-payments/",
  },
};

const ExchangeRates = async () => {
  const rates = await getExchangeRates();
  const user = await getUser(cookies().toString());

  return (
    <>
      <GoogleOneTapLogin user={user} />
      <Header user={user} />
      {/* <NavbarLight user={user} cookie={cookies().toString()} /> */}
      <main className="max-w-[1450px] mx-auto">
        <ExchangeTable
          rates={rates}
          categoryHeading="Online Payments"
          user={user}
        />
      </main>
      <Footer />
    </>
  );
};

export default ExchangeRates;
