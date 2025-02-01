"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import style from "../../assets/styles/navbar.module.css";
import { Menu, X } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import AvatarDropdown from "../reusable/AvatarDropdown";
import { Avatar } from "@/components/ui/avatar";
import { UserDetailsType } from "@/utils/types";
import NavLinks from "./NavLinks";
import NavLinksBlog from "./NavLinksBlog";

type Props = {
  type?: string;
  user: UserDetailsType;
};


const NavAuthButtonsLight = ({ type, user }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className={style.buttons}>
        <Link
          href="/login"
          onClick={() =>
            localStorage.setItem(
              "lastPathBeforeLogin",
              window.location.pathname
            )
          }
        >
          <Button className="text-black bg-transparent hover:bg-transparent hover:text-primary uppercase">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className=" text-white uppercase">Sign Up</Button>
        </Link>
      </div>
      <div className={style.toggle}>
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
                  <PopoverTrigger>
                    <Avatar name={user.firstName + " " + user.lastName} size="m" indicator={user.role === "admin" ? 'badge' : 'none'} />
                  </PopoverTrigger>
                  <AvatarDropdown user={user} />
                </Popover>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() =>
                      localStorage.setItem(
                        "lastPathBeforeLogin",
                        window.location.pathname
                      )
                    }
                  >
                    <Button className="text-black bg-transparent hover:bg-transparent hover:text-primary w-full uppercase">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className=" text-white w-full uppercase">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavAuthButtonsLight;
