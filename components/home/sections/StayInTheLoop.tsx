import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import woman from '@/assets/images/Woman running to spend money 1.svg';

const StayInTheLoop = () => {
  return (
    <div className="lg:flex lg:flex-row flex-col w-full max-w-[1640px] mx-auto bg-sky-200 justify-between min-[1640px]:mb-12">
      <div className="flex flex-col justify-center max-w-3xl md:pl-12 gap-1 p-4">
        <p className="lg:text-2xl text-xl font-semibold text-slate-700">
          Stay in the loop
        </p>
        <p className="text-slate-600 text-sm lg:text-base">
          Never miss out on the latest insights, trends, and stories from Cedi
          Life! Be the first to know when we publish new articles by subscribing
          to our alerts.
        </p>
        <div className="flex w-full max-w-sm pt-3 items-center space-x-2">
          <Input type="email" placeholder="Email" className="text-[16px]" />
          <Button type="submit" className="text-white">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="flex justify-end items-end h-full">
        <Image
          src={woman}
          // src="https://svgshare.com/i/14xk.svg"
          className="mb-[-46px]"
          alt=""
          draggable="false"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default StayInTheLoop;
