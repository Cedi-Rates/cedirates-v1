import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import svg from "@/assets/images/loop-svg.png";

const Subscribe = () => {
  return (
    <div className="max-w-[1450px] mx-auto lg:px-spacing-96 overflow-hidden mb-16">
      <div className="bg-primary-brand-secondary-500 grid md:grid-cols-2 rounded-br-radius-4xl rounded-bl-radius-4xl">
        <div className="md:m-auto md:pl-12 px-4 py-12 space-y-4">
          <p className="text-header-h4-bold md:text-header-h3-bold text-primary-brand-primary-100 mb-8">
            Stay in the <span className="text-white">loop</span>
          </p>
          <p className="text-paragraph-md-regular text-white">
            Never miss out on the latest insights, trends, and stories from Cedi
            Life! Be the first to know when we publish new articles by
            subscribing to our alerts.
          </p>
          <div className="flex items-center gap-spacing-12 pt-4">
            <Input
              type="email"
              placeholder="hello@gmail.com"
              className="rounded-[10px]"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
        <div className="hidden sm:flex sm:justify-end sm:items-end mt-10 md:mt-0">
          <Image src={svg} className="" alt="loop-svg" draggable="false" />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
