import React from "react";
import Logo from "../../assets/images/Cedirates_Logo-Black.svg";
import Image from "next/image";
import Link from "next/link";
import style from "../../assets/styles/navbar.module.css";
import NavLinks from "./NavLinks";
import { Avatar } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import AvatarDropdown from "../reusable/AvatarDropdown";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";
import NavAuthButtonsLight from "./NavAuthButtonsLight";
import { Button } from "@/components/ui/button";

const NavbarLightServer = async () => {
  const user = await getUser(cookies().toString());

  return (
    <div>
      <nav className={style.navbar}>
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
        <div className={style.navlinksDiv}>{<NavLinks />}</div>
        {user?.email ? (
          <Popover>
            <PopoverTrigger>
              <Avatar name={user?.firstName + " " + user?.lastName} size="l" indicator={user.role === "admin" ? 'badge' : 'none'} />
            </PopoverTrigger>
            <AvatarDropdown user={user} />
          </Popover>
        ) : (
          <NavAuthButtonsLight
            user={user}
          />
        )}
      </nav>
    </div>
  );
};

export default NavbarLightServer;
