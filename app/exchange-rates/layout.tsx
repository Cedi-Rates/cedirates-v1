import { Suspense } from "react";
import loading, { Loading } from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loading user={undefined} />}>{children}</Suspense>;
}
