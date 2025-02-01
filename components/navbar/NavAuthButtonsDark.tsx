"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import style from "../../assets/styles/navbar.module.css";

type Props = {};

const NavAuthButtonsDark = ({ }: Props) => {
  return (
    <div className={style.buttons}>
      <Link
        href="/login"
        onClick={() =>
          localStorage.setItem("lastPathBeforeLogin", window.location.pathname)
        }
      >
        <Button className="rounded-full bg-transparent hover:bg-transparent hover:text-primary">
          Login
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="rounded-full">Sign Up</Button>
      </Link>
    </div>
  );
};

export default NavAuthButtonsDark;
