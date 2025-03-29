import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import CurrencyConverter from "@/components/currencyConverter/CurrencyConverter";
import { MobileNav } from "@/components/mobile-nav";
import Header from "@/components/navbar/Header";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getUser } from "@/utils/helpers/api";
import { generateSchema } from "@/utils/schema";
import { cookies } from "next/headers";

async function Page() {
  const user = await getUser(cookies().toString());
  const schema = generateSchema("currencyConverter");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GoogleOneTapLogin user={user} />
      <Header user={user} />
      <CurrencyConverter />
      <MobileNav user={user} />
    </>

  );
}

export default Page;