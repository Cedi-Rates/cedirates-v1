"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import Poll from "./Poll";
import SideCard from "../sections/SideCard";
import { useSwipeable } from "react-swipeable";
import { Article, PollType } from "@/utils/types";
import { ProgressBarLink } from "@/app/progress-bar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import style from "@/assets/styles/blog.module.css";
// import placeholder from "@/assets/images/Cedirates-Logo_Icon-Black.svg";
import logos from '@/assets/images/logo-black.svg';


interface FeaturedBlogProps {
  blogs: {
    latestStories: Article[];
    forYou: Article[];
    pressReleases: Article[];
    topStories: Article[];
  };
  pollData: PollType;
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ blogs, pollData }) => {
  const [selectedBlogIndex, setSelectedBlogIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const handlers = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData.deltaX),
    trackMouse: true,
  });

  const isLoggedIn = true;

  // const slicedList = blogs?.latestStories.slice(105, 112);
  const slicedList = blogs?.topStories;

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Set interval to advance to the next blog every few minutes
    intervalRef.current = setInterval(() => {
      const nextIndex = (selectedBlogIndex + 1) % slicedList.length;
      setSelectedBlogIndex(nextIndex);
    }, 6000); // Advance every 5 minutes

    // Clear the interval on component unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlogIndex, blogs]);

  const goForward = () => {
    const nextIndex = (selectedBlogIndex + 1) % slicedList.length;
    setSelectedBlogIndex(nextIndex);
  };

  const goBackward = () => {
    const prevIndex =
      (selectedBlogIndex - 1 + slicedList.length) % slicedList.length;
    setSelectedBlogIndex(prevIndex);
  };

  const handleSwipe = (deltaX: number) => {
    if (deltaX < 0) {
      goForward();
    } else {
      goBackward();
    }
  };

  const selectedBlog = slicedList[selectedBlogIndex];
  const sanitizedTitle =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(selectedBlog?.title)
      : selectedBlog?.title;
  const publishedDate = new Date(selectedBlog?.createdAt);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-[1200px]:flex w-full items-center h-min gap-spacing-24 lg:px-spacing-96">
      <div
        {...handlers}
        className="aspect-[1.91/1] sm:aspect-[40/21] lg:rounded-radius-md sm:h-[414px] h-auto transition-all ease-in-out delay-100 overflow-hidden relative min-[1200px]:w-[800px] w-full min-[1200px]:mb-0 mb-4"
      >
        <div className="relative w-full h-full">
          <ProgressBarLink href={`/news/${selectedBlog?.slug}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,1)] z-10"></div>
            {/* <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,transparent_30%)] z-10"></div> */}
            {selectedBlog?.image ? (
              <Image
                src={selectedBlog.image}
                alt={selectedBlog?.title}
                className="object-cover w-full h-full"
                fill
                priority
              />
            ) : (
              <Image
                src={logos}
                alt={selectedBlog?.title}
                className="object-contain w-full h-full"
              />
            )}
          </ProgressBarLink>
        </div>
        <div className="sm:hidden block absolute top-2 right-2 bg-black bg-opacity-60 px-spacing-12 py-spacing-4 rounded-radius-2xl z-40">
          <p className="text-white text-xs">
            {selectedBlogIndex + 1}/{slicedList.length}
          </p>
        </div>
        <div className="absolute inset-0 px-4 sm:px-8 pb-4 z-[49] gap-spacing-20 flex flex-col justify-end h-[120px] w-full top-[100%] -translate-y-full transform">
          <div>
            <span
              className={`${style["truncate-two-lines"]} text-paragraph-lg-semibold text-text-text-alt`}
              dangerouslySetInnerHTML={{
                __html: sanitizedTitle,
              }}
            />
            <div className="hidden mt-5 sm:flex flex-row justify-between items-center">
              <div className="flex items-center flex-row">
                {selectedBlog?.category && (
                  <Button size={"sm"}>{selectedBlog?.category}</Button>
                )}
                <p className="text-paragraph-sm-regular text-text-text-alt px-6">
                  {selectedBlog?.origin}
                </p>
                {selectedBlog?.createdAt && (
                  <p className="text-paragraph-sm-regular text-text-text-alt">
                    {formattedDate}
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  variant={"ghost"}
                  size={"smIcon"}
                  onClick={goBackward}
                  className={`!text-white hover:!text-primary 
                    ${selectedBlogIndex === 0
                      ? "opacity-50 pointer-events-none"
                      : ""
                    }`}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"smIcon"}
                  onClick={goForward}
                  className={`!text-white hover:!text-primary 
                    ${selectedBlogIndex === slicedList.length - 1
                      ? "opacity-50 pointer-events-none"
                      : ""
                    }`}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SideCard pollData={pollData} />
    </div>
  );
};

export default FeaturedBlog;
