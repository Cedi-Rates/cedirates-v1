import React from "react";
import Header from "@/components/navbar/Header";
import { Button } from "@/components/ui/button";

export function loading() {
  return (
    <>
      <Header />
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-32 flex md:max-w-[700px] w-full px-2 sm:px-4 md:px-0 md:mx-auto text-center items-center justify-center`}
        style={{ height: "calc(100dvh - 180px)" }}
      >
        <div>
          <h1 className="font-bold text-[40px] md:text-[68px] mb-5 md:mb-10 leading-[42px] md:leading-[66px]">
            Get listed and showcase your rates
          </h1>
          <p className="mb-5 md:mb-10 text-black/60 text-[18px] md:text-[24px] font-light">
            Join our directory, showcase your rates and prices, and reach a
            targeted audience. Sign up now to connect with customers actively
            seeking reliable information and services.
          </p>
          <Button
            variant={"default"}
            size={"lg"}
            className="text-white font-medium text-base uppercase shadow-[inset_0px_1px_0px_0px_#ffffff30]"
          >
            Get listed for free
          </Button>
        </div>
      </div>
    </>
  );
}

export default loading;
