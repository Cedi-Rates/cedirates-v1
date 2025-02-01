"use client";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import NavbarLight from "@/components/navbar/NavbarLight";
import FeaturedBlog from "@/components/home/components/FeaturedBlog";
import {
  LatestStories,
  PressReleases,
  StoriesForYou,
  StayInTheLoop,
} from "@/components/home/sections";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import { Article, PollType, UserDetailsType } from "@/utils/types";
import Footer from "@/components/footer";
import DisplayAd from "./components/displayAd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Alert } from "../ui/alert";
import Subscribe from "./sections/Subscribe";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import Divider from "../ui/divider";
import Bar from "../ui/bar";

type Props = {
  blogs: {
    latestStories: Article[];
    forYou: Article[];
    pressReleases: Article[];
    topStories: Article[];
  };
  pollData: PollType;
  user: UserDetailsType | null;
};

const Loader = () => (
  <div className="max-w-[1450px] mx-auto lg:mt-6 px-spacing-0 lg:px-spacing-96">
    <div className="min-[1200px]:flex w-full items-center h-min gap-spacing-24 mb-9 lg:mb-6">
      <div className="">
        <Skeleton className="aspect-[30/21] sm:aspect-[40/21] lg:rounded-radius-md sm:h-[414px] h-auto overflow-hidden relative min-[1200px]:w-[800px] w-full min-[1200px]:mb-0 mb-4 bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
      <div className="px-spacing-12 lg:px-spacing-0 pt-3 lg:pt-0">
        <Skeleton className="h-[390px] lg:h-[414px] min-[1200px]:w-[434px] w-full bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
    </div>

    <div className="gap-spacing-24">
      <div className="flex items-center gap-2">
        <Bar />
        <h2 className="font-semibold sm:text-header-h6-semibold gap-spacing-8">
          Latest stories
        </h2>
      </div>
      <div className="hidden sm:block my-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-spacing-24">
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
        </div>
      </div>
      <div className="flex flex-col gap-spacing-24 sm:hidden my-6">
        <div className="flex sm:flex-row flex-col sm:gap-5 gap-2.5">
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
          <div className="my-2 border border-border-border-primary"></div>
          <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
        </div>
      </div>
      <Divider />
      <div className="sm:hidden w-full">
        <Skeleton className="h-[294px] w-full flex flex-col bg-[linear-gradient(90deg,_#eee_25%,_#ddd_50%,_#eee_75%)]" />
      </div>
    </div>
  </div>
);

export const HomePage = ({ blogs, pollData, user }: Props) => {
  // console.log('Feeds:', blogs);
  //   console.log("Polls:", pollData);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (token && email) {
      router.push(`/reset-password/?token=${token}&email=${email}`);
    } else if (token && !email) {
      // window.localStorage.setItem("token", token);
      // window.history.replaceState(null, null, "/");
      // window.location = "https://cedirates.com";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-[1451px]:items-center overflow-x-hidden overflow-y-hidden lg:mt-6">
      <Suspense fallback={<Loader />}>
        <div className="max-w-[1450px] mx-auto">
          <FeaturedBlog blogs={blogs} pollData={pollData} />
          <div className="space-y-6 pt-spacing-24 px-spacing-16 gap-spacing-24 lg:px-spacing-96 pb-spacing-32 lg:pb-spacing-64 lg:gap-spacing-32 max-w-[700px] mx-auto lg:max-w-full">
            <LatestStories blogs={blogs} />
            <StoriesForYou blogs={blogs} />
            <PressReleases blogs={blogs} pollData={pollData} />
          </div>
        </div>
      </Suspense>
      <div>
        <Subscribe />
        <Footer />
      </div>
    </main>
  );
};
