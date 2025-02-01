import React from "react";
import style from "@/assets/styles/fuelprices.module.css";
import NavbarLight from "@/components/navbar/NavbarLight";
import FuelTable from "@/components/fuelprices/FuelTable";
import { getFuelRates, getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";
import { Metadata } from "next";
import og from "@/assets/images/CediRates-Fuel-Prices-shrink.png";
import Footer from "@/components/footer";
import DisplayAd from "@/components/home/components/displayAd";
import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import Header from "@/components/navbar/Header";
import { MobileNav } from "@/components/mobile-nav";

const title = 'Fuel Prices in Ghana Today'
const content = "Compare Petrol and Diesel fuel prices in Ghana today. Find branches and quality reviews for Goil, StarOil, TotalEnergies, Shell and more on CediRates.";

export const metadata: Metadata = {
    title: title,
    description: content,
    openGraph: {
        title: title,
        description: content,
        images: og.src,
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: content,
        site: '@CediRates',
        images: og.src
    },
    alternates: {
        canonical: 'https://cedirates.com/fuel-prices/gh/'
    }
};

const FuelPrices = async () => {
    const rates = await getFuelRates();
    const user = await getUser(cookies().toString());

    return (
      <>
        <GoogleOneTapLogin user={user} />
        <Header user={user} />
        {/* <NavbarLight user={user} cookie={cookies().toString()} /> */}
        <main className="max-w-[1450px] mx-auto">
          <FuelTable rates={rates} user={user} />
        </main>
        <Footer />
        <MobileNav user={user} />
      </>
    );
};

export default FuelPrices;
