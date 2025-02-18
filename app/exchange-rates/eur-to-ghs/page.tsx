import React from "react";
import style from "../../../assets/styles/exchangerates.module.css";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getExchangeRates, getUser } from "@/utils/helpers/api";
import ExchangeTable from "@/components/exchangeRates/ExchangeTable";
import { cookies } from "next/headers";
import { Metadata } from "next";
import og from "../../../assets/images/Exchange Rates shrink.png";
import Footer from "@/components/footer";
import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import Header from "@/components/navbar/Header";
import { MobileNav } from "@/components/mobile-nav";
import ScrollToTop from "@/components/scroll-to-top";

const title = "Euro to Cedi Exchange Rate Today";
const content =
  "Check the Euro to Cedi rate for today. Latest exchange rates for Euros to Cedis from banks and forex bureaus in Ghana near you, updated on CediRates.";

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
    canonical: "https://cedirates.com/exchange-rates/eur-to-ghs/",
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
      {/* <NavbarLight user={user}  /> */}
      <main className="max-w-[1450px] mx-auto">
        <ExchangeTable rates={rates} categoryHeading="" user={user} />
      </main>
      <Footer />
      <MobileNav user={user} />
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `window.scrollTo(0, 0);`,
        }}
      /> */}
    </>
  );
};

export default ExchangeRates;
