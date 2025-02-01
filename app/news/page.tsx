import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import { DefaultBlog } from "@/components/home/default";
import { MobileNav } from "@/components/mobile-nav";
import NavbarLight from "@/components/navbar/NavbarLight";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";

const Page = async () => {
  const user = await getUser(cookies().toString());

  return (
    <>
      <GoogleOneTapLogin user={user} />
      <NavbarLight user={user} />
      <DefaultBlog />
      <MobileNav user={user} />
    </>
  );
};

export default Page;
