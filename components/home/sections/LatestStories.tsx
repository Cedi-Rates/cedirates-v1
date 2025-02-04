import React from "react";
import BlogCard from "../components/BlogCard";
import Ad from "../components/Ad";
import { Article } from "@/utils/types";
import LoaderImage from "@/assets/images/Ads/Swift Flitz.jpeg";
import Bar from "@/components/ui/bar";
import NewsCard from "../components/NewsCard";
import Divider from "@/components/ui/divider";
import MobileAd from "../components/mobileAd";

interface LatestStoriesProps {
  blogs: {
    latestStories: Article[];
    forYou: Article[];
    pressReleases: Article[];
    topStories: Article[];
  };
}

const LatestStories: React.FC<LatestStoriesProps> = ({ blogs }) => {
  return (
    <div className="gap-spacing-24">
      <div className="flex items-center gap-2">
        <Bar />
        <h2 className="font-semibold sm:text-header-h6-semibold gap-spacing-8">
          Latest stories
        </h2>
      </div>
      <div className="hidden sm:block my-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-spacing-24">
          <NewsCard
            blog={blogs?.latestStories[0]}
            description={false}
          />
          <Ad
            className=""
            loaderImage={LoaderImage}
            desc=""
            url="https://dub.sh/KSMinEt"
          />
          <NewsCard
            blog={blogs?.latestStories[1]}
            description={false}
          />
          <NewsCard
            blog={blogs?.latestStories[2]}
            description={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-spacing-24 sm:hidden my-6">
        <div className="flex sm:flex-row flex-col sm:gap-5 gap-2.5">
          <BlogCard
            blog={blogs?.latestStories[0]}
            main
            type="default"
            adBlog={false}
          />
          <BlogCard
            blog={blogs?.latestStories[1]}
            main={false}
            type="default"
            adBlog={false}
          />
          <div className="my-2 border border-border-border-primary"></div>
          <BlogCard
            blog={blogs?.latestStories[2]}
            main={false}
            type="default"
            adBlog={false}
          />
        </div>
      </div>
      <Divider />
      <div className="sm:hidden w-full">
        <MobileAd
          className="flex sm:hidden my-8"
          loaderImage={LoaderImage}
          desc=""
          url="https://dub.sh/KSMinEt"
        />
      </div>
    </div>
  );
};

export default LatestStories;