import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { getBase64ImageFromUrl } from "@/utils/helpers/helperfunctions";
import { BsChevronRight } from "react-icons/bs";
import { RxChevronRight } from "react-icons/rx";
import style from "../../../assets/styles/blog.module.css";
import { setTextColorBasedOnBackground } from "../Helper-Func";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import cediAd from '@/assets/images/Ads/mobile/mobile-ad.png';

interface AdProps {
  className?: any;
  type?: string;
  loaderImage: StaticImageData;
  desc: string;
  url: string;
}

const Ad: React.FC<AdProps> = ({
  className, type, loaderImage, desc, url
}) => {
  const [color, setColor] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("");
  const [visibleAd, setVisibleAd] = useState(true);

  useEffect(() => {
    const getCompanyColorsFunc = async () => {
      // if (companyDetails && companyDetails?.company?.image) {
      //   if (!companyDetails?.company?.bannerGradient) {
      // try {
      // const base64Image = await getBase64ImageFromUrl(
      //   "https://classify.space/wp-content/uploads/2021/08/classify-app-version-2-release-press-2-1024x576.png"
      // );
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = loaderImage.src;
      // img.src = base64Image;

      img.onload = async () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const palette = colorThief.getPalette(img, 2);

        if (palette.length >= 2) {
          // const gradient = `linear-gradient(125deg, rgb(${palette[0].join(
          //   ","
          // )}), rgb(${palette[0].join(",")},98%))`;
          const gradient = `rgb(${palette[0].join(",")})`;

          setColor(gradient);

          // const endpoint = `/api/v1/company/update-bannerGradient/${companyDetails.company._id}`;
          // await axios.patch(endpoint, {
          //   bannerGradient: gradient,
          // });
        }
      };
      // } catch (error) {
      //   console.error("Error extracting colors:", error);
      // }
      // } else {
      //   setGradientColors(companyDetails?.company?.bannerGradient);
      // }
    };

    getCompanyColorsFunc();
  }, [loaderImage]);

  useEffect(() => {
    if (color) setTextColorBasedOnBackground(color, setTextColor);
  }, [color]);

  const closeAd = () => {
    setVisibleAd(false);
  };

  switch (type) {
    case "horizontal":
      return (
        <div
          className={
            "border-[1px] aspect-[970/90] w-2/4 rounded-radius-md flex flex-row overflow-hidden border-slate-100 " +
            className
          }
        >
          <Image
            src={cediAd}
            className="aspect-[647/90] w-full"
            alt="AD"
          />
          <div className="flex flex-row justify-center w-full bg-[#125AFF] items-center h-full p-5 gap-8">
            <Button className="bg-[#FF006C] hover:bg-[#FF006C] text-white !px-2 !h-8">
              Learn More
            </Button>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={
            "relative border-[1px] w-full h-[294px] rounded-radius-md flex flex-col bg-[#FFF8F6] overflow-hidden border-slate-100" +
            className
          }
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {visibleAd && (
              <>
                <div className="h-[294px] flex flex-col relative">
                  <Image
                    src={loaderImage.src}
                    alt="Ad"
                    className="h-full w-full"
                    height={loaderImage.height}
                    width={loaderImage.width}
                  />
                  <span className="flex items-center gap-spacing-4 absolute top-0 right-0 mr-1.5 mt-1 text-caption-md-regular text-slate-400 py-1 rounded-lg">
                    <Link
                      href={
                        "https://docs.google.com/forms/d/e/1FAIpQLSfleX7usDLTeitb_i49ZtgkhePYOhQLnjb6WDN_3J1okeTV3A/viewform"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ad
                    </Link>
                    <IoMdCloseCircle
                      className="cursor-pointer"
                      onClick={closeAd}
                      size={15}
                    />
                  </span>
                </div>

                {/* <div
                  className={`absolute z-50 bottom-0 w-full py-spacing-8 px-spacing-12 flex flex-row items-center gap-1`}
                  style={{ background: color ? color : "" }}
                >
                  <p
                    className={`${style["truncate-two-lines"]} flex-[90%] overflow-hidden leading-tight mb-1 text-sm lg:text-base font-gellix-semibold`}
                    style={{ color: textColor }}
                  >
                    {desc}
                  </p>
                  <div className="flex flex-[10%] justify-end h-auto">
                    <RxChevronRight
                      className='h-6 w-6'
                      style={{ color: textColor }}
                    />
                  </div>
                </div> */}

              </>
            )}
          </Link>
        </div>
      );
  }
};

export default Ad;
