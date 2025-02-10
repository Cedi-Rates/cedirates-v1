import {
  getChartData,
  getCompanyData,
  getCompany,
  getCompanyDetails,
  getEvents,
  getFuelChartData,
  getReviews,
  getUser,
  getCompanyRate,
} from "@/utils/helpers/api";
import React from "react";
import style from "../../../assets/styles/company.module.css";
import { ReviewType } from "@/utils/types";
import { cookies } from "next/headers";
import NavbarLight from "@/components/navbar/NavbarLight";
import { Missing } from "@/components/notFound/notfound";
import Footer from "@/components/footer";
import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import dynamic from "next/dynamic";
import { MobileNav } from "@/components/mobile-nav";
import Header from "@/components/navbar/Header";
import CurrencyConverter from "@/components/brands/CurrencyConverter";
import LocationsList from "@/components/brands/Locations";

const CompanyHeader = dynamic(
  () => import("@/components/brands/CompanyHeader")
  // { ssr: false }
);
const Faqs = dynamic(() => import("@/components/brands/Faqs"), { ssr: false });
const RatesSection = dynamic(
  () => import("@/components/brands/RatesSection")
  // { ssr: false }
);
const ReviewSection = dynamic(
  () => import("@/components/brands/reviews/ReviewSection")
  // { ssr: false }
);
const EventsSection = dynamic(
  () => import("@/components/brands/EventsSection")
  // { ssr: false }
);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const companyDetails = await getCompanyDetails(params.slug);

  const title =
    companyDetails.company?.category === "exchangeRates"
      ? `${companyDetails.company?.companyName} Exchange Rate Today`
      : `${companyDetails.company?.companyName} Fuel Prices in Ghana Today`;

  const description =
    companyDetails.company?.category === "exchangeRates"
      ? `Check ${companyDetails.company?.companyName} Exchange Rate in Ghana today for the US Dollar (USD), Pound Sterling (GBP) & Euro (EUR) to Ghanaian Cedi (GHS). See reviews and subscribe for updates on CediRates.`
      : `Find the latest fuel petrol and diesel prices in Ghana from ${companyDetails.company?.companyName}. Subscribe for updates.`;

  const canonical = `https://cedirates.com/company/${companyDetails.company?.url}/`;
  const image = `/api/og/?company=${companyDetails.company?.companyName}`;

  return {
    title: title,
    description: description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      site: "@CediRates",
      images: image,
    },
    alternates: {
      canonical: canonical,
    },
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await getUser(cookies().toString());
  const companyDetails = await getCompanyDetails(params.slug);
  const companyData = await getCompanyRate(params.slug);
  const reviews: ReviewType[] = await getReviews(companyDetails.company?._id);
  const events = await getEvents(companyDetails.company?._id);

  const chartData =
    companyDetails?.company.category === "fuelPrices"
      ? await getChartData(companyDetails.company?.companyName)
      : await getFuelChartData(companyDetails.company?.companyName);

  const title =
    companyDetails.company?.category === "exchangeRates"
      ? `${companyDetails.company?.companyName} Exchange Rate Today`
      : `${companyDetails.company?.companyName} Fuel Prices in Ghana Today`;

  const description =
    companyDetails.company?.category === "exchangeRates"
      ? `Check ${companyDetails.company?.companyName} Exchange Rate in Ghana today for the US Dollar (USD), Pound Sterling (GBP) & Euro (EUR) to Ghanaian Cedi (GHS). See reviews and subscribe for updates.`
      : `Find the latest fuel petrol and diesel prices in Ghana from ${companyDetails.company?.companyName}. Subscribe for updates.`;

  const reviewValue = companyDetails.company?.numOfRatings;
  const averageRating = companyDetails.company?.averageRating;
  const ratingValue = companyDetails.company?.numOfReviews;
  const image = companyDetails.company?.image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: description,
    image: image,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviewValue,
    },
  };

  if (!companyDetails || !companyDetails.company) {
    return <Missing />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoogleOneTapLogin user={user} />
      <Header user={user} />
      <main className="max-w-[1450px] mx-auto mt-5 px-spacing-16 lg:px-[95px]">
        <CompanyHeader
          companyDetails={companyDetails}
          user={user}
          chartData={chartData}
        />
        <div className="flex flex-col md:flex-row gap-3 sm:gap-6 lg:gap-20">
          <div className={style["main-section"] + "basis-[40%] w-full"}>
            <div className={style[""]}>
              <RatesSection
                companyDetails={companyDetails}
                companyData={companyData}
                user={user}
              />
              <ReviewSection
                companyDetails={companyDetails}
                user={user}
                reviews={reviews}
                events={events}
              />
              <div className="mb-3">
                <Faqs companyDetails={companyDetails} />
              </div>
            </div>
            {/* <EventsSection companyDetails={companyDetails} events={events} /> */}
          </div>
          <div className=" basis-[60%] w-full  flex flex-col gap-6 items-center">
            {companyDetails?.company?.category == "exchangeRates" && (
              <CurrencyConverter companyData={companyData} />
            )}
            <div className="sm:w-auto sm:px-0 px-5 w-screen overflow-x-scroll">
              <LocationsList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav user={user} />
    </>
  );
};

export default page;
