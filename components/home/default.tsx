"use client";
import NavbarLight from "@/components/navbar/NavbarLight";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ClipboardCopy from "@/utils/copyButton";
import Image from "next/image";
import { IoShareOutline } from "react-icons/io5";
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
import pixels from "../../assets/images/pexels-photo-5849580.webp";
import Ad from "../../assets/images/Ads/ad.png";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaSortDown, FaSortUp } from "react-icons/fa";

interface ExchangeRate {
  currency: string;
  value: string;
}

export const DefaultBlog = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [sorting, setSorting] = useState(true);
  const url = "www.cedirates.com";

  const testHTML = `<p class="bn-inline-content">In today&apos;s globalised economy, navigating currency exchange rates is essential for various financial activities, including travel, commerce, and investment. CediRates, a versatile web application, serves as a comprehensive currency converter tailored to users dealing with Ghanaian Cedi (GHS) and major international currencies such as the US Dollar (USD), Euro (EUR), and British Pound (GBP). This guide will walk you through the steps of using CediRates for seamless currency conversions and highlight its utility in facilitating GHS to USD/EUR/GBP or vice versa transactions. </p><p id='live-price'>eur</p><p class="bn-inline-content"></p><h3 class="bn-inline-content">Getting Started with CediRates: </h3><ol><li><p class="bn-inline-content"> <strong>Accessing the Platform:</strong> Begin by visiting the CediRates website on your preferred web browser. As a web application, CediRates offers the convenience of instant access without requiring any downloads or installations. </p></li><li><p class="bn-inline-content"><strong>Selecting Currency Pair:</strong> Upon accessing the platform, you&apos;ll be prompted to select the currency pair for conversion. Choose GHS as the base currency and select USD, EUR, or GBP as the target currency, depending on your transaction requirements. </p></li><li><p class="bn-inline-content"><strong>Entering Amount:</strong> Input the amount of GHS you intend to convert into the designated field. CediRates utilises real-time exchange rates to compute the equivalent amount in the selected target currency, ensuring accuracy and transparency in your conversions.  </p></li><li><p class="bn-inline-content"><strong>Viewing Conversion Results:</strong> Instantly observe the converted amount in the target currency displayed on the screen. CediRates provides precise and up-to-date exchange rate information, enabling users to make informed decisions regarding their financial transactions. </p></li></ol><p class="bn-inline-content"></p><h3 class="bn-inline-content">Benefits of CediRates: </h3><ol><li><p class="bn-inline-content"><strong>User-Friendly Interface:</strong> CediRates boasts an intuitive interface designed for ease of use and accessibility. Whether you&apos;re a seasoned investor or a casual user, navigating the platform is straightforward and hassle-free. </p></li><li><p class="bn-inline-content"><strong>Real-Time Exchange Rates:</strong> Access reliable exchange rate data sourced from reputable financial institutions and market sources. CediRates ensures that users have access to the latest currency values, empowering them to execute transactions with confidence. </p></li><li><p class="bn-inline-content"><strong>Multi-Currency Support:</strong> Enjoy the flexibility of converting between a wide range of currencies beyond GHS, USD, EUR, and GBP. CediRates accommodates diverse currency pairs, catering to the needs of users engaged in international trade, travel, or investment.</p></li><li><p class="bn-inline-content"><strong>Efficient Currency Conversion:</strong> Streamline your currency conversion process with CediRates&apos; efficient algorithm, which delivers instant results without delays or complications. Whether you&apos;re converting small amounts or large sums, CediRates simplifies the task at hand.</p></li><li><p class="bn-inline-content"><strong>Enhanced Financial Planning:</strong> Utilize CediRates as a valuable tool for financial planning and decision-making. Monitor currency trends, analyse historical exchange rate data, and gain insights into market fluctuations to optimise your financial strategies. </p></li></ol><p class="bn-inline-content"></p><p class="bn-inline-content">In conclusion, CediRates emerges as an indispensable resource for individuals and businesses seeking reliable currency conversion solutions. With its user-friendly interface, real-time exchange rates, and multi-currency support, CediRates empowers users to navigate the complexities of international finance with confidence and ease. Experience the convenience and efficiency of CediRates today, and elevate your currency conversion experience to new heights.</p><p class="bn-inline-content"></p>`;

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

  return (
    <>
      {/* <NavbarLight type="blog" /> */}
      <main className="pt-32 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-[1400px]">
          <article className="mx-auto w-full max-w-3xl">
            <div className="">
              <span className="text-blue-500 font-medium">Product Updates</span>
              <div className="mt-6">
                <h1 className="mb-5 text-2xl md:text-4xl font-[530] text-slate-700">
                  {`Say Hello to Seamless Conversions with our Currency Converter!`}
                </h1>
                <p className="my-5 text-slate-500 leading-tight">
                  {`Try out the Cedirates Currency Converter today and experience the convenience and reliability for yourself. We're confident that once you start using it, you'll wonder how you ever managed without it!`}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    By <span className="text-blue-500">Jermaine Antwi</span>
                  </p>
                  <p>Published: {moment(Date()).fromNow()}</p>
                </div>

                <div>
                  <Drawer>
                    <DrawerTrigger>
                      <Button className="bg-white border border-blue-500 hover:bg-blue-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center focus:outline-none">
                        <IoShareOutline color="black" size={20} />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="sm:max-w-[425px] mx-auto p-5">
                      <DrawerTitle className="mb-5 px-4">CediRates</DrawerTitle>
                      <div className="flex gap-2 mx-auto">
                        <div>
                          <FacebookShareButton url={url}>
                            <FacebookIcon size={70} />
                          </FacebookShareButton>
                        </div>
                        <div className="">
                          <TwitterShareButton url={url}>
                            <XIcon size={70} />
                          </TwitterShareButton>
                        </div>
                        <div>
                          <WhatsappShareButton url={url}>
                            <WhatsappIcon size={70} />
                          </WhatsappShareButton>
                        </div>
                        <div>
                          <TelegramShareButton url={url}>
                            <TelegramIcon size={70} />
                          </TelegramShareButton>
                        </div>
                      </div>
                      <div className="flex gap-2 mx-auto">
                        <div>
                          <LinkedinShareButton url={url}>
                            <LinkedinIcon size={70} />
                          </LinkedinShareButton>
                        </div>
                        <div>
                          <EmailShareButton url={url}>
                            <EmailIcon size={70} />
                          </EmailShareButton>
                        </div>
                        <div>
                          <RedditShareButton url={url}>
                            <RedditIcon size={70} />
                          </RedditShareButton>
                        </div>
                        <div>
                          <ClipboardCopy copyText={url} size={70} />
                        </div>
                      </div>
                      <DrawerFooter>
                        <DrawerClose>
                          <Button className="w-full" variant="outline">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>

                {/* <div>
                        <RWebShare
                        data={{
                            text: "",
                            url: url,
                            title: "CediRates",
                        }}
                        // onClick={() => console.log("shared successfully!")}
                        >
                        <Button className="bg-white border border-blue-500 hover:bg-blue-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center focus:outline-none">
                            <IoShareOutline color="black" size={20} />
                        </Button>
                        </RWebShare>
                    </div> */}
              </div>

              <Image
                // src="https://images.pexels.com/photos/5849580/pexels-photo-5849580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                src={pixels}
                // className="aspect-[40/21] max-w-[64.75rem] rounded-xl mt-7"
                className="my-7 rounded-xl aspect-[40/21]"
                alt="Blog Image"
              />

              {/* <div dangerouslySetInnerHTML={{ __html: modifyHTML(testHTML) }} /> */}

              <div>
                <p className="mb-4 font-normal">
                  In today&apos;s globalised economy, navigating currency
                  exchange rates is essential for various financial activities,
                  including travel, commerce, and investment. CediRates, a
                  versatile web application, serves as a comprehensive currency
                  converter tailored to users dealing with Ghanaian Cedi (GHS)
                  and major international currencies such as the US Dollar
                  (USD), Euro (EUR), and British Pound (GBP). This guide will
                  walk you through the steps of using CediRates for seamless
                  currency conversions and highlight its utility in facilitating
                  GHS to USD/EUR/GBP or vice versa transactions.
                </p>
                <div className="my-5 flex items-center gap-2">
                  {rates.map((rate, index) => (
                    <div
                      key={index}
                      className="flex items-center box-border bg-zinc-50 border border-gray-300 rounded-full px-2 cursor-pointer"
                    >
                      <h1 className="font-bold text-[14px] text-[#1f282d]">
                        {rate.currency}
                      </h1>
                      {sorting ? (
                        <FaSortUp className="text-[#05b92f] relative top-1" />
                      ) : (
                        <FaSortDown
                          color="red"
                          className="relative bottom-0.5"
                        />
                      )}
                      <h1 className="text-[14px] font-bold leading-[14px]">
                        {rate.value}
                      </h1>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold mb-2">
                  Getting Started with CediRates:{" "}
                </h3>
                <ol>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>Accessing the Platform:</strong> Begin by visiting
                      the CediRates website on your preferred web browser. As a
                      web application, CediRates offers the convenience of
                      instant access without requiring any downloads or
                      installations.{" "}
                    </p>
                  </li>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>Selecting Currency Pair:</strong> Upon accessing
                      the platform, you&apos;ll be prompted to select the
                      currency pair for conversion. Choose GHS as the base
                      currency and select USD, EUR, or GBP as the target
                      currency, depending on your transaction requirements.{" "}
                    </p>
                  </li>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>Entering Amount:</strong> Input the amount of GHS
                      you intend to convert into the designated field. CediRates
                      utilises real-time exchange rates to compute the
                      equivalent amount in the selected target currency,
                      ensuring accuracy and transparency in your conversions.{" "}
                    </p>
                  </li>
                  <li>
                    <p className="mb-10 font-normal">
                      <strong>Viewing Conversion Results:</strong> Instantly
                      observe the converted amount in the target currency
                      displayed on the screen. CediRates provides precise and
                      up-to-date exchange rate information, enabling users to
                      make informed decisions regarding their financial
                      transactions.{" "}
                    </p>
                  </li>
                </ol>
                <h3 className="text-2xl font-semibold mb-2">
                  Benefits of CediRates:
                </h3>
                <ol>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>User-Friendly Interface:</strong> CediRates boasts
                      an intuitive interface designed for ease of use and
                      accessibility. Whether you&apos;re a seasoned investor or
                      a casual user, navigating the platform is straightforward
                      and hassle-free.{" "}
                    </p>
                  </li>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>Real-Time Exchange Rates:</strong> Access reliable
                      exchange rate data sourced from reputable financial
                      institutions and market sources. CediRates ensures that
                      users have access to the latest currency values,
                      empowering them to execute transactions with confidence.{" "}
                    </p>
                  </li>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>Multi-Currency Support:</strong> Enjoy the
                      flexibility of converting between a wide range of
                      currencies beyond GHS, USD, EUR, and GBP. CediRates
                      accommodates diverse currency pairs, catering to the needs
                      of users engaged in international trade, travel, or
                      investment.
                    </p>
                  </li>
                  <li>
                    <p className="mb-4 font-normal">
                      <strong>Efficient Currency Conversion:</strong> Streamline
                      your currency conversion process with CediRates&apos;
                      efficient algorithm, which delivers instant results
                      without delays or complications. Whether you&apos;re
                      converting small amounts or large sums, CediRates
                      simplifies the task at hand.
                    </p>
                  </li>
                  <li>
                    <p className="mb-8 font-normal">
                      <strong>Enhanced Financial Planning:</strong> Utilize
                      CediRates as a valuable tool for financial planning and
                      decision-making. Monitor currency trends, analyse
                      historical exchange rate data, and gain insights into
                      market fluctuations to optimise your financial strategies.{" "}
                    </p>
                  </li>
                </ol>
                <p className="bn-inline-content font-normal">
                  In conclusion, CediRates emerges as an indispensable resource
                  for individuals and businesses seeking reliable currency
                  conversion solutions. With its user-friendly interface,
                  real-time exchange rates, and multi-currency support,
                  CediRates empowers users to navigate the complexities of
                  international finance with confidence and ease. Experience the
                  convenience and efficiency of CediRates today, and elevate
                  your currency conversion experience to new heights.
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-4 my-8">
              <Badge className="text-sm bg-slate-200 py-[6px] px-2 rounded hover:text-white">
                Tag3
              </Badge>
              <Badge className="text-sm bg-slate-200 px-2 rounded hover:text-white">
                Tag2
              </Badge>
              <Badge className="text-sm bg-slate-200 rounded hover:text-white py-0 px-2">
                Tag1
              </Badge>
            </div>
          </article>
        </div>
        <div className="flex justify-center mb-6">
          <Image src={Ad} alt="ad-banner" />
        </div>
      </main>
    </>
  );
};
