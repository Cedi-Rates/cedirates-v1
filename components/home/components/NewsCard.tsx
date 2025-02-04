"use client"
import { Button } from '@/components/ui/button';
import { Article } from '@/utils/types';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import style from '@/assets/styles/blog.module.css'
import logos from '@/assets/images/logo-black.svg';
import { ProgressBarLink } from '@/app/progress-bar';
import DOMPurify from "dompurify";

interface BlogCardProps {
  blog: Article;
  description?: boolean;
}

const NewsCard = ({
  blog, description
}: BlogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const author = blog?.publishedBy &&
    `${blog.publishedBy.firstName} ${blog.publishedBy.lastName}`;
  const publishedDate = new Date(blog?.createdAt);
  const date = publishedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const sanitizedTitle = typeof window !== "undefined"
    ? DOMPurify.sanitize(blog?.title) : blog?.title
  const sanitizedSummary = typeof window !== "undefined"
    ? DOMPurify.sanitize(blog?.summary) : blog?.summary;

  return (
    <>
      {!blog ? (
        <Card className="flex justify-center items-center h-[294px] w-full border rounded-radius-md bg-secondary-steel-gray-25 shadow-md">
          <CardContent className='flex justify-center items-center'>
            <Image
              src={logos}
              placeholder='blur'
              blurDataURL={logos.src}
              alt='Logo'
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="h-[294px] w-full flex flex-col">
          <ProgressBarLink
            href={`/news/${blog?.slug}`}
            className="flex flex-col h-full"
          >
            <CardHeader className="relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex justify-center items-center bg-secondary-steel-gray-25">
                  <Image
                    src={logos}
                    alt="Logo"
                    className="w-20 h-20 object-contain"
                    priority
                  />
                </div>
              )}
              {blog?.image && (
                <Image
                  src={blog.image}
                  alt={blog?.title}
                  className="h-[200px] object-cover rounded-radius-md w-full"
                  width={300}
                  height={200}
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              )}
              {blog?.category && (
                <span className="absolute bottom-0 right-0 mb-3 px-2 py-1">
                  <Button size={"sm"}>{blog?.category}</Button>
                </span>
              )}
            </CardHeader>
            <CardContent className="mt-3 space-y-2 flex-grow">
              <h3
                dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
                className={`${style["truncate-two-lines"]} text-paragraph-md-semibold text-text-text-primary`}
              />
              <CardDescription>
                {description && (
                  <p
                    dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
                    className="text-gray-600 text-sm duration-150 group-hover:text-gray-800"
                  />
                )}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between mt-auto">
              <p className="text-paragraph-sm-medium text-text-text-brand-secondary">
                {blog?.rssExternalLink ? blog?.origin : author}
              </p>
              <p className="text-paragraph-sm-regular text-text-text-quarternary">
                {blog?.createdAt && date}
              </p>
            </CardFooter>
          </ProgressBarLink>
        </Card>
      )}
    </>
  );
}

export default NewsCard
