"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/Cedirates_Logo-Black.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import style from "../../assets/styles/404.module.css";

export const Missing = () => {
  return (
    <div className={style["my-class"]}>
      <div className={style.root}>
        <div className={style.container}>
          <div className={style.body}>
            <a className={style["bear-link"]} href="/">
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
            </a>
            <h1 className={style.four}>
              404 <span aria-hidden="true">404</span>
            </h1>
            <div className={style["cloak__wrapper"]}>
              <div className={style["cloak__container"]}>
                <div className={style.cloak}></div>
              </div>
            </div>
            <div className={style.info}>
              <p className="font-thin select-text">
                Yie! Dumsor strikes again... check
                <Link className="font-black" href={"/exchange-rates/usd-to-ghs"}>
                  {" "}
                  Exchange Rates
                </Link>{" "}
                and
                <Link className="font-black" href={"/fuel-prices/gh"}>
                  {" "}
                  Fuel Prices{" "}
                </Link>
                while we restore power.
              </p>
              <a className={style.follow} href="/">
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
