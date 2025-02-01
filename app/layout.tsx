/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import gellix, { inter } from "../public/fonts/index";
import Footer from "@/components/footer";
import "@/assets/fonts/style.css";
import main from "../assets/images/Main.png";
import { ProgressBar } from "./progress-bar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/scroll-to-top";

const title = "CediRates | Latest News, Exchange Rates and Fuel Prices";
const desc =
  "Check the latest news, exchange rates and fuel prices in Ghana today on CediRates. Find reliable updates provided with news for additional context.";

export const metadata: Metadata = {
  title: {
    template: "%s | CediRates",
    default: title,
  },
  description: desc,
  icons: {
    icon: "https://i.ibb.co/17kpK6P/E7-B6-C8-A3-CE77-4-DF1-9-B43-66316-C319396.png",
  },
  openGraph: {
    title: title,
    description: desc,
    type: "website",
    images: main.src,
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: desc,
    site: "@CediRates",
    images: main.src,
  },
  alternates: {
    canonical: "https://cedirates.com/",
  },
  metadataBase: new URL("https://cedirates.com/"),
};

export default function RootLayout({
  children,
  blogs,
}: Readonly<{
  children: React.ReactNode;
  blogs: { topStories: { image: string }[] };
}>) {
  const imageUrls = blogs?.topStories?.map((story) => story.image) || [];

  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://api.whatsapp.com/send/?phone=%2B233209013527&text=I+saw+your+ad+on+CediRates"
          as="image"
        />
        <link
          rel="preload"
          href="https://wa.me/+233504099404?text=I%20saw%20your%20ad%20on%20CediRates"
          as="image"
        />
        <link rel="preload" href="/assets/images/loop-svg.png" as="image" />
        <link
          rel="preload"
          href="/assets/images/Cedirates-Logo_Icon-Black.svg"
          as="image"
        />
        <link rel="preload" href="/assets/images/logo-black.svg" as="image" />
        {imageUrls.map((url, index) => (
          <link key={index} rel="preload" href={url} as="image" />
        ))}
      </Head>
      <GoogleAnalytics />
      <body className={`overflow-x-hidden`}>
        <ScrollToTop />
        <ProgressBar className="fixed top-0 left-0 right-0 h-1 bg-primary z-50">
          {children}
          <Toaster />
        </ProgressBar>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
        <Script
          id="ms_clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "k8wu4tcvqs");`,
          }}
        />
      </body>
    </html>
  );
}
