import React from "react";
import Logo from "../../assets/images/Cedirates_Logo-White.svg";
import Image from "next/image";
import Link from "next/link";
import style from "../../assets/styles/navbar.module.css";
import NavLinks from "./NavLinks";
import { cookies } from "next/headers";
import { getUser } from "@/utils/helpers/api";
import { Avatar } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import AvatarDropdown from "../reusable/AvatarDropdown";
import NavAuthButtonsDark from "./NavAuthButtonsDark";

const NavbarDark = async () => {
  const user = await getUser(cookies().toString());

  return (
    <div>
      <nav className={style["dark-navbar"]}>
        <Link href="/" className="logo">
          <Image
            src={Logo}
            alt="logo"
            priority={true}
            width={140}
            className="hidden lg:block"
          />
          <Image
            src={Logo}
            alt="logo"
            priority={true}
            width={120}
            className="block lg:hidden"
          />
        </Link>
        <NavLinks user={user} />
        {user?.email ? (
          <Popover>
            <PopoverTrigger>
              <Avatar name={user.firstName + " " + user.lastName} size="m" indicator={user.role === "admin" ? 'badge' : 'none'} />
            </PopoverTrigger>
            <AvatarDropdown user={user} />
          </Popover>
        ) : (
          <NavAuthButtonsDark />
        )}
      </nav>
    </div>
  );
};

export default NavbarDark;
