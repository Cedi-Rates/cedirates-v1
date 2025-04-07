"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/Cedirates_Logo-Black.svg";
import Image from "next/image";
import style from "../../assets/styles/navbar.module.css";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import NavLinksBlog from "./NavLinksBlog";
import { Menu, Search, X } from "lucide-react";
import { UserDetailsType } from "@/utils/types";
import { ProgressBarLink } from "@/app/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import AvatarDropdown from "../reusable/AvatarDropdown";
import { getExchangeRates } from "@/utils/helpers/api";
import Link from "next/link";
import NavRates from "./navRates";

type Rate = {
  company: string;
  rates: { label: string; value: string }[];
};

type Props = {
  type?: string;
  user: UserDetailsType;
};

const NavbarLight = ({ type, user }: Props) => {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveCompanyRates, setCompanyRates] = useState<any>([]);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    async function fetchAndSetRates() {
      const rates = await getExchangeRates();

      const tempRates = rates.filter(
        (item) => item.company.UniqueID !== "C-BAW5G8M1"
      );
      const sortedRates = [
        rates.find((item) => item.company.UniqueID === "C-BAW5G8M1"),
        ...tempRates.sort(() => 0.5 - Math.random()).slice(0, 3),
      ];

      setCompanyRates(sortedRates);
    }

    fetchAndSetRates();
  }, []);
  // Rotate companies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setCurrentCompanyIndex((prevIndex) =>
          prevIndex === liveCompanyRates.length - 1 ? 0 : prevIndex + 1
        );
        setIsRotating(false);
      }, 500); // Rotate animation duration
    }, 8000);

    return () => clearInterval(interval);
  }, [liveCompanyRates.length]);

  return (
    <div className="flex sm:flex-col flex-col-reverse">
      <div className="overflow-scroll border-b border-t border-slate-200 w-full">
        <a
          href={`https://cedirates.com/company/${liveCompanyRates[currentCompanyIndex]?.company.url}`}
        >
          <div
            className="flex flex-row gap-3 w-max px-3 sm:px-16 py-3"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              overflow: "hidden",
              transform: isRotating ? "translateY(10%)" : "translateY(0)",
              opacity: isRotating ? 0 : 1,
              transition: "transform 0.4s ease, opacity 0.3s ease",
            }}
          >
            <div className="flex flex-row w-max items-center gap-1">
              {liveCompanyRates.length > 0 ? (
                <Image
                  alt={`Logo for ${liveCompanyRates[currentCompanyIndex]?.company?.companyName}`}
                  className="h-6 w-6 rounded-full"
                  src={liveCompanyRates[currentCompanyIndex]?.company?.image}
                  width={200}
                  height={200}
                  style={{
                    display: isRotating ? "none" : "block",
                    transition: "opacity 0.3s ease",
                    opacity: isRotating ? 0 : 1,
                  }}
                />
              ) : (
                <div
                  className="w-max"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#E0E0E0",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              )}
              {liveCompanyRates[currentCompanyIndex] ? (
                <p className="text-paragraph-md-semibold">
                  {liveCompanyRates[currentCompanyIndex]?.company?.companyName}
                </p>
              ) : (
                <div
                  style={{
                    width: "60px",
                    height: "1.2rem",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "4px",
                  }}
                />
              )}
            </div>
            <div className="flex flex-row gap-2">
              {liveCompanyRates[currentCompanyIndex] ? (
                <>
                  <span className="flex flex-row items-center gap-1">
                    <p className="text-paragraph-md-medium capitalize text-text-text-quarternary">
                      Selling:
                    </p>
                    <p className="text-paragraph-md-semibold">
                      GHS{" "}
                      {liveCompanyRates[
                        currentCompanyIndex
                      ]?.dollarRates?.sellingRate?.toFixed(2) ?? "00.00"}
                    </p>
                  </span>
                  <span className="flex flex-row items-center gap-1">
                    <p className="text-paragraph-md-medium capitalize text-text-text-quarternary">
                      Buying:
                    </p>
                    <p className="text-paragraph-md-semibold">
                      GHS{" "}
                      {liveCompanyRates[
                        currentCompanyIndex
                      ]?.dollarRates?.buyingRate?.toFixed(2) ?? "00.00"}
                    </p>
                  </span>
                  <span className="flex flex-row items-center gap-1">
                    <p className="text-paragraph-md-medium capitalize text-text-text-quarternary">
                      MidRate:
                    </p>
                    <p className="text-paragraph-md-semibold">
                      GHS{" "}
                      {liveCompanyRates[
                        currentCompanyIndex
                      ]?.dollarRates?.midRate?.toFixed(2) ?? "00.00"}
                    </p>
                  </span>
                </>
              ) : (
                [1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "70px",
                      height: "1.2rem",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </a>
      </div>
      <nav className={`${style.navbar}`}>
        <ProgressBarLink href="/" className="logo absolute">
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
        </ProgressBarLink>
        <div className="w-3 h-3 lg:hudden" />
        <div className={style.navlinksDiv}>
          {type === "blog" ? <NavLinksBlog /> : <NavLinks />}
        </div>
        <div className={style.buttons + " hidden lg:flex"}>
          {type === "blog" ? (
            <>
              <Search />
              <Menu />
            </>
          ) : (
            <>
              {user?.email ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar
                      name={user.firstName + " " + user.lastName}
                      size="m"
                      indicator={user.role === "admin" ? "badge" : "none"}
                    />
                  </PopoverTrigger>
                  <AvatarDropdown user={user} />
                </Popover>
              ) : (
                <>
                  <ProgressBarLink
                    href="/login"
                    onClick={() =>
                      localStorage.setItem(
                        "lastPathBeforeLogin",
                        window.location.pathname
                      )
                    }
                  >
                    <Button variant={"ghost"}>Login</Button>
                  </ProgressBarLink>
                  <ProgressBarLink href="/signup">
                    <Button>Sign Up</Button>
                  </ProgressBarLink>
                </>
              )}
            </>
          )}
        </div>
        <div className={style.toggle}>
          {user?.email && (
            <div className="mr-2">
              <Popover>
                <PopoverTrigger>
                  <Avatar
                    name={user.firstName + " " + user.lastName}
                    size="m"
                  />
                </PopoverTrigger>
                <AvatarDropdown user={user} />
              </Popover>
            </div>
          )}
          <button onClick={toggleMobileMenu} className={style.menuButton}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className={style.mobileMenu}>
            {type === "blog" ? <NavLinksBlog /> : <NavLinks />}
            {!type && (
              <div className={style.mobileButtons}>
                {user?.email ? (
                  <Popover>
                    <PopoverTrigger></PopoverTrigger>
                  </Popover>
                ) : (
                  <>
                    <ProgressBarLink
                      href="/login"
                      onClick={() =>
                        localStorage.setItem(
                          "lastPathBeforeLogin",
                          window.location.pathname
                        )
                      }
                    >
                      <Button variant={"ghost"} className="w-full">
                        Login
                      </Button>
                    </ProgressBarLink>
                    <ProgressBarLink href="/signup">
                      <Button className="w-full">Sign Up</Button>
                    </ProgressBarLink>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavbarLight;
