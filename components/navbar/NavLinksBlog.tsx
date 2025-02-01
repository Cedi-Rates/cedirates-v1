"use client";
import React, { useState } from "react";
import { UserDetailsType } from "@/utils/types";
import style from "../../assets/styles/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  user?: UserDetailsType;
};

const NavLinksBlog = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <span className={style.toggle} onClick={() => setOpen(!open)}>
        111
      </span>
      <div id={!open ? style["nav-close"] : ""} className={style["nav-links"]}>
        <ul className="sm:flex hidden space-x-144">
          <li>
            <Link
              className={`${pathname.includes("/exchange-rates/usd-to-ghs/") ? style.active : ""
                }`}
              href="/exchange-rates/usd-to-ghs/"
            >
              Quicklinks
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname.includes("/fuel-prices") ? style.active : ""
                }`}
              href="/fuel-prices/gh"
            >
              News
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname.includes("/listing") ? style.active : ""}`}
              href="/listing"
            >
              Sports
            </Link>
          </li>
          <li>
            <Link
              className={`${pathname.includes("/currency-converter") ? style.active : ""
                }`}
              href="/currency-converter"
            >
              Entertainment
            </Link>
          </li>
        </ul>

        <div className={style["mobile-buttons"]}>
          <Link href="/login" className="w-full">
            <Button className="text-black rounded-full bg-transparent w-full hover:bg-transparent hover:text-primary">
              Login
            </Button>
          </Link>

          <Link href="/signup" className="w-full">
            <Button className="rounded-full px-3 w-full text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavLinksBlog;
