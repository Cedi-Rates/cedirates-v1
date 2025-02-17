// import { Suspense } from "react";
// import loading, { Loading } from "./loading";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return <Suspense fallback={<Loading user={undefined} />}>{children}</Suspense>;
// }

import { Suspense } from "react";
import loading, { Loading } from "./loading";
import ResetScrollOnReload from "@/components/reset-scroll-component";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ResetScrollOnReload />
      <Suspense fallback={<Loading user={undefined} />}>{children}</Suspense>
    </>
  );
}
