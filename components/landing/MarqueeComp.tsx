import React from "react";
import style from "../../assets/styles/landing.module.css";
import Marquee from "react-fast-marquee";
import { images as marqueeImages } from "../../utils/landingPageMarqueeImages";
import Image from "next/image";

const MarqueeComp = () => {
  return (
    <div className="marquee-container w-[100%] sm:max-w-[1050px]">
      <h2 className={style["marquee-text"]}>Trusted data sourced from:</h2>
      <Marquee className={style.marquee} speed={60} gradient={false}>
        {marqueeImages.map((item) => {
          return (
            <Image
              key={item.name}
              src={item.image}
              alt={item.name}
              priority={true}
              height={50}
            />
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
