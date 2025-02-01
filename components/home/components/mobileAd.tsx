import React, { useEffect, useState } from 'react'
import ColorThief from "colorthief";
import { getBase64ImageFromUrl } from "@/utils/helpers/helperfunctions";
import { RxChevronRight } from "react-icons/rx";
import style from "../../../assets/styles/blog.module.css";
import { setTextColorBasedOnBackground } from "../Helper-Func";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

interface AdProps {
    className?: any;
    type?: string;
    loaderImage: StaticImageData;
    desc: string;
    url: string;
}

const MobileAd: React.FC<AdProps> = ({
    className, type, loaderImage, desc, url
}) => {
    const [color, setColor] = useState<string | null>(null);
    const [textColor, setTextColor] = useState("");
    const [visibleAd, setVisibleAd] = useState(true);

    useEffect(() => {
        const getCompanyColorsFunc = async () => {
            const img = new window.Image();
            img.crossOrigin = "Anonymous";
            img.src = loaderImage.src;

            img.onload = async () => {
                const colorThief = new ColorThief();
                const dominantColor = colorThief.getColor(img);
                const palette = colorThief.getPalette(img, 2);

                if (palette.length >= 2) {
                    const gradient = `rgb(${palette[0].join(",")})`;

                    setColor(gradient);
                }
            };
        };

        getCompanyColorsFunc();
    }, [loaderImage]);

    useEffect(() => {
        if (color) setTextColorBasedOnBackground(color, setTextColor);
    }, [color]);

    const closeAd = () => {
        setVisibleAd(false);
    };

    return (
      <div
        className={
          "border-[1px] w-[450px] h-[450px] max-[490px]:w-full max-[490px]:h-full mx-auto rounded-radius-md flex flex-col bg-[#FFF8F6] overflow-hidden border-slate-100" +
          className
        }
      >
        {visibleAd && (
          <>
            <div className="aspect-square md:aspect-[40/21] flex flex-col relative flex-[90%]">
              <Image
                src={loaderImage.src}
                alt="Ad"
                className="aspect-square !md:aspect-[40/21] h-full"
                width={loaderImage.width}
                height={loaderImage.width}
                loading="lazy"
              />
              <span className="flex items-center gap-spacing-4 absolute top-0 right-0 mr-1.5 mt-1 text-caption-md-regular text-text-text-alt py-1 rounded-lg">
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
                  className="cursor-pointer h-4 w-4"
                  onClick={closeAd}
                />
              </span>
            </div>
            <Link href={url} target="_blank" rel="noopener noreferrer" className='hidden'>
              <div
                className={`h-full py-spacing-8 px-spacing-12 flex-[10%] flex flex-row items-center gap-1`}
                style={{ background: color ? color : "" }}
              >
                <p
                  className={`${style["truncate-two-lines"]} flex-[90%] overflow-hidden text-caption-sm-semibold leading-[15px]`}
                  style={{ color: textColor }}
                >
                  {desc}
                </p>
                <div className="flex flex-[10%] justify-end h-auto">
                  <RxChevronRight
                    className="h-6 w-6"
                    style={{ color: textColor }}
                  />
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    );
}

export default MobileAd

