import { Metadata } from "next";
import { Suspense } from "react";
import og from "../../assets/images/CediRates-Currency-Converter-shrink.png";
import Loading from "./loading";

const title = "Currency Converter - Real Exchange Rates in Ghana Today"
const desc = "Free currency converter to check exchange rates in Ghana today. Get Euro, Pound and Dollar to Cedi conversions with the free CediRates calculator."

export const metadata: Metadata = {
  title: title,
  description: desc,
  openGraph: {
    title: title,
    description: desc,
    images: og.src,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: desc,
    site: '@CediRates',
    images: og.src
  },
  alternates: {
    canonical: 'https://cedirates.com/currency-converter/'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loading user={undefined} />}>{children}</Suspense>;
}
