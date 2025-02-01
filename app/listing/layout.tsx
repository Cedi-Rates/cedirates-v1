import { Metadata } from "next";
import { Suspense } from "react";
import main from "@/assets/images/Main.png";
import Loading from "./loading";

const content =
  'Add your exchange rates or fuel prices on CediRates for free to increase your online presence and community engagement. Get listed and boost your online reach'

export const metadata: Metadata = {
  title: 'Get Listed for Free',
  description: content,
  openGraph: {
    title: 'Get Listed for Free',
    description: content,
    images: main.src,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Listed for Free',
    description: content,
    site: '@CediRates',
    images: main.src
  },
  alternates: {
    canonical: 'https://cedirates.com/listing/'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
