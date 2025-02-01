import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Account Settings'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
