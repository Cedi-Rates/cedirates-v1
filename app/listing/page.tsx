import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import ListingPage from "@/components/listing/ListingPage";
import { MobileNav } from "@/components/mobile-nav";
import Header from "@/components/navbar/Header";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";


const Listing = async () => {
  const user = await getUser(cookies().toString());

  return (
    <>
      <GoogleOneTapLogin user={user} />
      {/* <NavbarLight user={user} cookie={cookies().toString()} /> */}
      <Header user={user} />
      <ListingPage />
      {/* <MobileNav /> */}
    </>
  );
};

export default Listing;