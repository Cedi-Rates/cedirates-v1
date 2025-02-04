"use client";
import { Article } from "@/utils/types";
import Link from "next/link";
import React, { useState } from "react";
import style from "../../../assets/styles/blog.module.css";
import Image from "next/image";
import { ProgressBarLink } from "@/app/progress-bar";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import logos from '@/assets/images/logo-black.svg';
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCardProps {
  blog: Article;
  main: boolean;
  type: "pressRelease" | "default";
  adBlog?: boolean;
  className?: string;
}

interface ImageWithOverlayProps {
  src: string;
  summary: string;
  main: boolean;
  title: string;
  category: string;
}

interface BlogDetailsProps {
  summary: string;
  date: string;
  main: boolean;
  title: string;
  adBlog?: boolean;
  author: string;
}

interface MobileViewProps {
  blog: Article;
  date: string;
  type: "pressRelease" | "default";
  main: boolean;
}

interface PressReleaseCard {
  blog: Article;
}

const mobileSkeleton = () => (
  <div className="grid sm:hidden grid-cols-4 gap-2 items-center w-full">
    <Image
      src={logos}
      className='w-20 h-20 object-contain'
      alt="Logo"
    />
    <div className="flex flex-col col-span-3 gap-y-1">
      <Skeleton className="h-3 w-[100px]" />
      <Skeleton className="h-3 w-[250px]" />
      <Skeleton className="h-3 w-[100px]" />
    </div>
  </div>
);

const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({
  src,
  summary,
  main,
  title,
  category,
}) => {
  return (
    <div
      className={`${main ? "sm:aspect-[40/21] aspect-[358/243]" : "aspect-[40/21]"
        } flex flex-col relative`}
    >
      <Image
        src={src}
        className={`${main ? "sm:aspect-[40/21] aspect-[358/243]" : "aspect-[40/21]"} object-cover`}
        alt={"NO IMAGE"}
        width={500}
        height={500}
      />

      {main && (
        <div className="absolute flex sm:hidden flex-row items-end px-3 pb-3.5 bg-gradient-to-b sm:bg-none from-transparent from-40% to-black sm:bg-opacity-75 bg-transparent top-0 left-0 h-full w-full">
          <h3
            className={`${style["truncate-two-lines"]} text-white text-sm leading-tight`}
          >
            {title}
          </h3>
        </div>
      )}
      <span className="absolute bottom-0 hidden sm:block right-0 mr-3 mb-3 px-2 py-1">
        <Button size={'sm'}>{category}</Button>
      </span>
    </div>
  )
};

const BlogDetails: React.FC<BlogDetailsProps> = ({
  summary,
  date,
  main,
  title,
  adBlog,
  author,
}) => {
  const sanitizedSummary = typeof window !== "undefined"
    ? DOMPurify.sanitize(summary) : summary;

  return (
    <div className={` ${main && "sm:flex hidden"} flex flex-col p-3 gap-3.5`}>
      <h3
        className={`${style["truncate-two-lines"]} text-slate-700 text-base leading-5 font-semibold`}
      >
        {title}
      </h3>

      {adBlog && (
        <p
          className={`${style["truncate-five-lines"]} text-slate-700 leading-5 text-sm lg:text-base`}
          dangerouslySetInnerHTML={{
            __html: sanitizedSummary,
          }}
        />
      )}
      <div className="flex flex-row justify-between">
        <p className="text-slate-400 text-[12px] lg:text-sm">{author}</p>
        <p className="text-slate-400 text-[12px] lg:text-sm">{date}</p>
      </div>
    </div>
  )
}

const PressReleaseCard: React.FC<PressReleaseCard> = ({ blog }) => (
  <div className="hidden sm:block rounded-lg overflow-hidden border border-[#f8f8f8]">
    <ProgressBarLink href={`/news/${blog?.slug}`}>
      <div className="aspect-[40/21] flex flex-col relative">
        <Image
          src={blog?.image}
          className="aspect-[40/21] w-full"
          alt="Blog Image"
          width={500}
          height={500}
        />
        <span className="absolute bottom-0 right-0 mr-3 mb-3 px-2 py-1">
          <Button size={'sm'}>Press Release</Button>
        </span>
      </div>
      <div className="flex flex-col p-3 gap-3.5">
        <p
          className={`${style["truncate-two-lines"]} text-slate-700 text-base leading-5 font-semibold`}
        >
          {blog?.title}
        </p>
      </div>
    </ProgressBarLink>
  </div>
);

const MobileView: React.FC<MobileViewProps> = ({ blog, type, main, date }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <ProgressBarLink
      href={blog?.rssExternalLink ? `/news/${blog?.slug}?ref=cedirates` : `/news/${blog?.slug}`}
      className={`${main && "hidden"} sm:hidden`}
    >
      <div className="grid sm:hidden grid-cols-4 items-center gap-2.5 w-full">
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <Image
              src={logos}
              className="absolute inset-0 w-full h-full object-contain rounded-lg"
              alt="Logo"
              width={400}
              height={400}
              priority
            />
          )}
          <Image
            src={blog?.image}
            className={`sm:aspect-[41/20] aspect-square object-cover rounded-lg transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            alt={blog?.title}
            width={500}
            height={500}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="flex flex-col col-span-3 justify-between">
          {type !== "pressRelease" && (
            <p className="font-semibold text-[12px] text-text-text-brand">
              {blog?.category}
            </p>
          )}
          <p
            className={`${style["truncate-two-lines"]} text-paragraph-sm-semibold leading-[17.14px] text-text-text-primary`}
          >
            {blog?.title}
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-caption-md-semibold text-text-text-brand-secondary">
              {blog?.rssExternalLink
                ? blog.origin
                : `${blog?.publishedBy.firstName} ${blog?.publishedBy.lastName}`}
            </p>
            <p className="text-caption-md-regular text-text-text-quarternary text-right">
              {blog?.createdAt && date}
            </p>
          </div>
        </div>
      </div>
    </ProgressBarLink>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  main,
  type,
  adBlog,
  className,
}) => {
  const authorName =
    blog?.publishedBy &&
    `${blog.publishedBy.firstName} ${blog.publishedBy.lastName}`;
  const publishedDate = new Date(blog?.createdAt);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {!blog ? (
        mobileSkeleton()
      ) : (
        <>
          {type === "default" ? (
            <div
              className={`${!main ? "sm:flex hidden h-full" : "flex"
                } border-[1px] w-full rounded-lg flex-col overflow-hidden border-slate-100 ${className || ""
                }`}
            >
              <ProgressBarLink href={`/news/${blog?.slug}`}>
                <ImageWithOverlay
                  src={blog?.image}
                  summary={blog?.summary}
                  main={main}
                  title={blog?.title?.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(num))}
                  category={blog?.category}
                />
                <BlogDetails
                  summary={blog?.summary}
                  title={blog?.title?.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(num))}
                  date={formattedDate}
                  main={main}
                  adBlog={adBlog}
                  author={String(blog?.rssExternalLink ? blog.origin : authorName)}
                />
              </ProgressBarLink>
            </div>
          ) : (
            <PressReleaseCard blog={blog} />
          )}
          <MobileView blog={blog} type={type} main={main} date={formattedDate} />
        </>
      )}
    </>
  );
};

export default BlogCard;
