import { Metadata } from "next";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";

const content =
  "Log in to CediRates and compare exchange rates or fuel prices. Use our fuel calculator to check how much it costs to fill your tank";

export const metadata: Metadata = {
  title: "Reset password",
  description: content,
  openGraph: {
    title: "Reset password",
    description: content,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset password",
    description: content,
    site: "@CediRates",
  },
  alternates: {
    canonical: "https://cedirates.com/reset-password/",
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
