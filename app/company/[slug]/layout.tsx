import { Suspense } from "react";
import SkeletonComponent from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<SkeletonComponent user={undefined} />}>{children}</Suspense>;
}
