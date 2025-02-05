"use client";
/* eslint-disable react/no-unescaped-entities */
import NavbarLight from "@/components/navbar/NavbarLight";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  XIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import ClipboardCopy from "@/utils/copyButton";
import Image from "next/image";
import Ad from "../../assets/images/Ads/ad.png";
import { RWebShare } from "react-web-share";
import pixels from "../../assets/images/pexels-photo-5849580.webp";
import { Article } from "@/utils/types";
import Link from "next/link";
import style from "../../assets/styles/blog.module.css";
import DisplayAd from "./components/displayAd";
import { ProgressBarLink } from "@/app/progress-bar";
import DOMPurify from "dompurify";
import { Button } from "../ui/button";
import Subscribe from "./sections/Subscribe";
import Footer from "../footer";

moment.suppressDeprecationWarnings = true;
type Props = {
  blog: Article;
};

interface ExchangeRate {
  currency: string;
  value: string;
}

export const Blog = ({ blog }: Props) => {
  console.log("Specific Blog:", blog);

  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [sorting, setSorting] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");
  const publishedDate = new Date(blog.createdAt);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  function getExchangeRates(): Promise<ExchangeRate[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.BASE_URL}/average/${moment().format("D-M-YYYY")}`, {
          headers: { "custom-origin": "cedirates-dev" },
        })
        .then((response) => {
          const data = response.data;
          // console.log(data);

          if (data) {
            // resolve([
            //   data.averageDollar.sellingRate.toFixed(2),
            //   data.averagePound.sellingRate.toFixed(2),
            //   data.averageEuro.sellingRate.toFixed(2)
            // ]);
            resolve([
              {
                currency: "USD",
                value: data.averageDollar.sellingRate.toFixed(2),
              },
              {
                currency: "GBP",
                value: data.averagePound.sellingRate.toFixed(2),
              },
              {
                currency: "EUR",
                value: data.averageEuro.sellingRate.toFixed(2),
              },
            ]);
          } else {
            // resolve("-");
            resolve([
              { currency: "USD", value: "-" },
              { currency: "GBP", value: "-" },
              { currency: "EUR", value: "-" },
            ]);
          }
        })
        .catch((error) => {
          console.error("Error fetching exchange rates:", error);
          // resolve("-");
        });
    });
  }

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    async function updateExchangeRates() {
      try {
        const data: any = await getExchangeRates();
        const tag: HTMLElement | null = document.querySelector("#live-price");

        if (tag && tag.innerText.toUpperCase().includes("USD")) {
          tag.innerText = `USD: ${data[0].toString()}`;
        } else if (tag && tag.innerText.toUpperCase().includes("GBP")) {
          tag.innerText = `GBP: ${data[1].toString()}`;
        } else if (tag && tag.innerHTML.toUpperCase().includes("EUR")) {
          tag.innerText = `EUR: ${data[2].toString()}`;
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }

    updateExchangeRates();
  }, []);

  useEffect(() => {
    async function updateExchangeRates() {
      try {
        const data = await getExchangeRates();
        setRates(data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }

    updateExchangeRates();
  }, []);

  function modifyHTML(htmlString: string): string {
    if (typeof document !== "undefined") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;

      const h2Tags = tempDiv.querySelectorAll("h2");
      h2Tags.forEach((tag: HTMLElement) =>
        tag.classList.add("text-3xl", "font-semibold")
      );

      const livePrice = tempDiv.querySelectorAll("#live-price");
      livePrice.forEach((tag: any) =>
        tag.classList.add(
          "border-blue-400",
          "border-2",
          "capsizedText",
          "px-4",
          "w-max",
          "hover:bg-blue-400",
          "hover:text-white",
          "transition",
          "ease-in-out",
          "delay-50",
          "rounded-full",
          "text-sm"
        )
      );

      const h3Tags = tempDiv.querySelectorAll("h3");
      h3Tags.forEach((tag: HTMLElement) =>
        tag.classList.add("text-2xl", "font-semibold")
      );

      const strong = tempDiv.querySelectorAll("strong");
      strong.forEach((tag: any) => tag.classList.add("!font-[600]"));

      const emptyPTags = tempDiv.querySelectorAll("p:empty");
      emptyPTags.forEach((tag: any) => (tag.style.height = "20px")); // Adjust the height value as needed

      const allTags = tempDiv.querySelectorAll("*");
      allTags.forEach((tag: any) => tag.classList.add("pb-[0.45rem]"));
      return tempDiv.innerHTML;
    } else {
      return htmlString;
    }
  }

  const sanitizedTitle =
    typeof window !== "undefined" ? DOMPurify.sanitize(blog.title) : blog.title;

  const sanitizedSummary =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(blog.summary)
      : blog.summary;

  const sanitizedContent =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(blog.content)
      : blog.content;

  return (
    <>
      <main className="">
        <div className="pt-10 px-4 flex justify-between mx-auto max-w-screen-[1400px]">
          <article className="mx-auto w-full max-w-3xl">
            <div className="space-y-5">
              <h3 className="text-primary text-paragraph-lg-semibold leading-7 capitalize">
                {blog.category}
              </h3>
              <h1
                className="text-text-text-primary text-header-blog-small lg:text-header-blog-large"
                dangerouslySetInnerHTML={{
                  __html: sanitizedTitle,
                }}
              />
              <h6
                className="py-2 text-text-text-secondary text-paragraph-md-regular leading-[28.4px]"
                dangerouslySetInnerHTML={{
                  __html: sanitizedSummary,
                }}
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-primary text-paragraph-lg-semibold leading-7">
                    {blog?.rssExternalLink
                      ? blog?.origin
                      : `${blog?.publishedBy?.firstName} ${blog?.publishedBy?.lastName}`}
                  </p>
                  <p className="text-paragraph-lg-medium leading-7">
                    <span className="capitalize">{blog.status}: </span>
                    {formattedDate}
                  </p>
                </div>

                <div>
                  <RWebShare
                    data={{
                      text: blog.title,
                      url: currentUrl,
                      title: blog.title,
                    }}
                  >
                    <Button
                      className="rounded-radius-full"
                      size={"icon"}
                      variant={"outline"}
                    >
                      <IoShareOutline color="" size={16} />
                    </Button>
                  </RWebShare>
                </div>
              </div>
            </div>

            <div className="my-6">
              <Image
                src={blog?.image}
                className="rounded-radius-md object-contain h-full w-full"
                alt="Blog Image"
                objectFit="contain"
                width={800}
                height={400}
              />
            </div>

            <div className="">
              <p
                className={`${style["bn-inline-content"]} text-text-text-secondary text-paragraph-md-regular leading-[28.4px]`}
                dangerouslySetInnerHTML={{
                  __html: sanitizedContent,
                }}
              />

              {blog?.rssExternalLink && (
                <Link
                  href={`${blog?.rssExternalLink}?ref=cedirates`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-normal"
                >
                  Read More
                </Link>
              )}
            </div>

            <div className="my-6 flex flex-wrap gap-2">
              {blog?.tags?.map((tag, index) => (
                <Badge size={"m"} key={index}>
                  {tag}
                </Badge>
              ))}
            </div>

            <DisplayAd position="bottom" />
          </article>
        </div>

        <div>
          <Subscribe />
          <Footer />
        </div>
      </main>
    </>
  );
};
