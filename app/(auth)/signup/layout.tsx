import { Suspense } from "react";
import { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

const content =
  "Sign up with CediRates and compare exchange rates or fuel prices. Use our fuel calculator to check how much it costs to fill your tank.";

export const metadata: Metadata = {
  title: "Register With CediRates",
  description: "Register with CediRates",
  openGraph: {
    title: "Create an Account",
    description: content,
    type: "website",
    images: "",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create an Account",
    description: content,
    site: "@CediRates",
    images: [""],
  },
  alternates: {
    canonical: "https://cedirates.com/signup/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <ViewTransitions>{children}</ViewTransitions>
    </Suspense>
  );
}
