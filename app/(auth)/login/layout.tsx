import { Metadata } from "next";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";


const content =
  'Log in to CediRates and compare exchange rates or fuel prices. Use our fuel calculator to check how much it costs to fill your tank'

export const metadata: Metadata = {
  title: 'Create an Account or Sign In',
  description: content,
  openGraph: {
    title: 'Create an Account or Sign In',
    description: content,
    type: 'website',
    images: 'https://ibb.co/hFnM8pF',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create an Account or Sign In',
    description: content,
    site: '@CediRates',
    images: ['https://ibb.co/hFnM8pF']
  },
  alternates: {
    canonical: 'https://cedirates.com/login/'
  }
}

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
