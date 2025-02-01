"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ads } from "@/utils/ads";
import { AdType } from "@/utils/types";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

interface DisplayAdProps {
  position: "top" | "bottom";
};

function shuffleArray(array: AdType[]): AdType[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


const DisplayAd = ({ position }: DisplayAdProps) => {
  const [ad, setAd] = useState<AdType | null>(null);
  const [visibleAd, setVisibleAd] = useState(true);
  const [shownAds, setShownAds] = useState<AdType[]>([]);

  useEffect(() => {
    const shuffledAds = shuffleArray([...ads]);

    if (position === "top") {
      setAd(shuffledAds[0]);
    } else if (position === "bottom") {
      setAd(shuffledAds[1]);
    }
  }, [position]);

  const closeAd = () => {
    setVisibleAd(false);
  };

  return (
    <div className="">
      {visibleAd && ad && (
        <div className="relative">
          <Link
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="justify-center mb-6 lg:mb-9 w-[100%] hidden md:block">
              <Image
                className="rounded-radius-lg"
                src={ad.desktopImage}
                alt="ad-banner"
                loading="lazy"
              />
            </div>
            <div className="flex justify-center mb-6 lg:mb-9 w-[100%] md:hidden">
              <Image
                className="rounded-radius-lg"
                src={ad.mobileImage}
                alt="ad-banner"
                loading="lazy"
              />
            </div>
          </Link>
          <span className="flex items-center gap-1 absolute z-40 top-0 right-0 p-1 rounded-lg">
            <Link
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSfleX7usDLTeitb_i49ZtgkhePYOhQLnjb6WDN_3J1okeTV3A/viewform"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption-md-regular leading-[18px] text-secondary-steel-gray-300"
            >
              Ad
            </Link>
            <IoMdCloseCircle
              className="cursor-pointer h-4 w-4"
              onClick={closeAd}
              color="#d4d4d4"
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default DisplayAd;
