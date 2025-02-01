"use client";

import React from "react";
import Logo from "../../assets/images/Cedirates_Logo-Blue.svg";
import Image from "next/image";
import Link from "next/link";
import style from "../../assets/styles/navbar.module.css";

const LoginNavbarLight = ({}) => {
  return (
    <div>
      <nav className={style.navbar}>
        <Link href="/" className="logo">
          <Image src={Logo} alt="logo" priority height={60} />
        </Link>

        {/* <div className={style.buttons}>
          {showLogin ? (
            <p>
              Already have an account?{" "}
              <span className="text-primary">
                <Link href="/login">Log in</Link>
              </span>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <span className="text-primary">
                <Link href="/signup">Create account</Link>
              </span>
            </p>
          )}
        </div> */}
      </nav>
    </div>
  );
};

export default LoginNavbarLight;