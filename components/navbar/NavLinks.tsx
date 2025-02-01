"use client";
import React, { useState } from "react";
import { UserDetailsType } from "@/utils/types";
import style from "../../assets/styles/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBarLink } from "@/app/progress-bar";

type Props = {
  user?: UserDetailsType;
};

const NavLinks = ({ user }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div className={style["nav-links"]}>
        <ul>
          <li>
            <ProgressBarLink
              className={`${pathname.includes("/exchange-rates/usd-to-ghs/") ? style.active : ""
                } font-gellix-medium`}
              href="/exchange-rates/usd-to-ghs"
            >
              Exchange Rates
            </ProgressBarLink>
          </li>
          <li>
            <ProgressBarLink
              className={`${pathname.includes("/fuel-prices") ? style.active : ""
                } font-gellix-medium`}
              href="/fuel-prices/gh"
            >
              Fuel Prices
            </ProgressBarLink>
          </li>
          <li>
            <ProgressBarLink
              className={`${pathname.includes("/listing") ? style.active : ""
                } font-gellix-medium`}
              href="/listing"
            >
              For Businesses
            </ProgressBarLink>
          </li>
          <li>
            <ProgressBarLink
              className={`${pathname.includes("/currency-converter") ? style.active : ""
                } font-gellix-medium`}
              href="/currency-converter"
            >
              Currency Converter
            </ProgressBarLink>
          </li>
        </ul>

        <div className={style["mobile-buttons"]}>
          <ProgressBarLink href="/login" className="w-full">
            <Button className="text-black rounded-full bg-transparent w-full hover:bg-transparent hover:text-primary">
              Login
            </Button>
          </ProgressBarLink>

          <ProgressBarLink href="/signup" className="w-full">
            <Button className="rounded-full w-full text-white">Sign Up</Button>
          </ProgressBarLink>
        </div>
      </div>
    </>
  );
};

export default NavLinks;
