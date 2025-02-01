"use client";
import React from "react";
import style from "../../assets/styles/footer.module.css";
import logo from "../../assets/images/logos.svg";
import Image from "next/image";
import {
  BsTelegram,
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsLinkedin,
  BsTiktok,
} from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNavs } from "@/utils/links";
import ft from "@/assets/images/lgfooter.png";

const Footer = () => {
  const pathname = usePathname();
  const hideFooter = pathname === "/login" || pathname === "/signup";

  return (
    // <div style={{ backgroundImage: `url(${ft.src})` }}>
    <div className="border-t">
      {!hideFooter && (
        <footer className="max-w-[1450px] mx-auto pt-spacing-48 px-spacing-16 lg:px-spacing-96 pb-24 md:pb-spacing-32 gap-spacing-24 lg:gap-spacing-32 overflow-hidden">
          <div className="lg:justify-between lg:flex mb-7 pb-7 border-b">
            <div className="w-full md:max-w-xs">
              <Link className="" href="/">
                <Image src={logo} alt="logo" loading="lazy" width={130} />
              </Link>
              <p className="text-paragraph-md-regular text-text-text-quarternary mt-3 text-[15px]">
                Data visualization, and expense management for your business.
              </p>
              <div className="mt-20 hidden lg:block">
                <h3 className="text-header-h6-bold text-text-text-secondary">
                  Join our community
                </h3>
                <div className="mt-4 flex item-center gap-spacing-12">
                  <a
                    href="https://t.me/cedirates"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <BsTelegram className="icon text-2xl" />
                  </a>
                  <a
                    href="https://facebook.com/cedirates"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <BsFacebook className="icon text-2xl" />
                  </a>
                  <a
                    href="https://x.com/CediRates"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <RiTwitterXLine className="icon text-2xl" />
                  </a>
                  <a
                    href="https://www.instagram.com/cedirates/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <BsInstagram className="icon text-2xl" />
                  </a>
                  <a
                    href="https://whatsapp.com/channel/0029Va85saH8fewp4bmpLH2q"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <BsWhatsapp className="icon text-2xl" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@cedirates"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <BsTiktok className="icon text-2xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/cedirates"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    <BsLinkedin className="icon text-2xl" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 grid grid-cols-2 gap-8 sm:gap-6 lg:gap-10 xl:gap-16 sm:grid-cols-4">
              {footerNavs.map((item, idx) => (
                <ul className="space-y-4" key={idx}>
                  <h4 className="text-paragraph-md-semibold text-text-text-primary text-justify">
                    {item.label}
                  </h4>
                  {item.items.map((el, idx) => (
                    <li key={idx}>
                      <a
                        href={el.href}
                        className="text-paragraph-sm-regular text-text-text-tertiary text-justify hover:text-primary"
                      >
                        {el.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="mt-10 lg:hidden">
              <h3 className="text-header-h6-bold text-text-text-secondary">
                Join our community
              </h3>
              <div className="mt-4 flex item-center gap-spacing-12">
                <a
                  href="https://t.me/cedirates"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <BsTelegram className="icon text-2xl" />
                </a>
                <a
                  href="https://facebook.com/cedirates"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <BsFacebook className="icon text-2xl" />
                </a>
                <a
                  href="https://x.com/CediRates"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <RiTwitterXLine className="icon text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/cedirates/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <BsInstagram className="icon text-2xl" />
                </a>
                <a
                  href="https://whatsapp.com/channel/0029Va85saH8fewp4bmpLH2q"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <BsWhatsapp className="icon text-2xl" />
                </a>
                <a
                  href="https://www.tiktok.com/@cedirates"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <BsTiktok className="icon text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/company/cedirates"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  <BsLinkedin className="icon text-2xl" />
                </a>
              </div>
            </div>
          </div>
          <p className="text-paragraph-sm-regular text-text-text-quarternary">
            ©{new Date().getFullYear()} CediRates. All rights reserved
          </p>
        </footer>
      )}
    </div>
    // </div>
  );
};

export default Footer;
