import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import CurrencyConverter from "@/components/currencyConverter/CurrencyConverter";
import { MobileNav } from "@/components/mobile-nav";
import Header from "@/components/navbar/Header";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";

async function Page() {
  const user = await getUser(cookies().toString());

  return (
    <>
      <GoogleOneTapLogin user={user} />
      <Header user={user}/>
      <CurrencyConverter />
      <MobileNav user={user} />
    </>

  );
}

export default Page;