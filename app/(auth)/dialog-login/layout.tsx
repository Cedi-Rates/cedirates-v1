import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";

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
