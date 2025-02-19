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
import ScrollToTop from "@/components/scroll-to-top";

const title = "Pound to Cedis Fintech Rates Today";
const content =
  "Compare fintech Pound to Cedi rate for today. Latest exchange rates for Pounds to Cedis for fintechs that support Ghana, updated on CediRates.";

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
    canonical: "https://cedirates.com/exchange-rates/gbp-to-ghs/fintech/",
  },
};

const ExchangeRates = async () => {
  const rates = await getExchangeRates();
  const user = await getUser(cookies().toString());

  return (
    <>
      {/* <ScrollToTop /> */}
      <GoogleOneTapLogin user={user} />
      <Header user={user} />
      {/* <NavbarLight user={user} cookie={cookies().toString()} /> */}
      <main className="max-w-[1450px] mx-auto">
        <ExchangeTable rates={rates} categoryHeading="Fintech" user={user} />
      </main>
      <Footer />
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `window.scrollTo(0, 0);`,
        }}
      /> */}
    </>
  );
};

export default ExchangeRates;
