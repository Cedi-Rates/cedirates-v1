import React from "react";
import BlogCard from "../components/BlogCard";
import { Article } from "@/utils/types";
import Ad from "../components/Ad";
import LoaderImage from "@/assets/images/Ads/Oba tours - Cape town.jpeg";
import Bar from "@/components/ui/bar";
import Divider from "@/components/ui/divider";
import NewsCard from "../components/NewsCard";
import MobileAd from "../components/mobileAd";

interface Stories4YouProps {
  blogs: {
    latestStories: Article[];
    forYou: Article[];
    pressReleases: Article[];
    topStories: Article[];
  };
}

const StoriesForYou: React.FC<Stories4YouProps> = ({ blogs }) => {
  return (
    <div className="gap-spacing-24">
      <div className="flex items-center gap-2">
        <Bar />
        <h2 className="font-semibold sm:text-header-h6-semibold gap-spacing-8">
          Stories for you
        </h2>
      </div>
      <div className="hidden sm:block my-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-spacing-24">
          <NewsCard blog={blogs?.forYou[0]} description={false} />
          <NewsCard blog={blogs?.forYou[1]} description={false} />
          <Ad
            className=""
            loaderImage={LoaderImage}
            desc=""
            url="https://dub.sh/6rRw1hS"
          />
          <NewsCard blog={blogs?.forYou[2]} description={false} />
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:hidden my-6">
        <div className="flex sm:flex-row flex-col sm:gap-5 gap-2.5">
          <BlogCard
            blog={blogs?.forYou[0]}
            main
            type="default"
            adBlog={false}
          />
          <BlogCard
            blog={blogs?.forYou[1]}
            main={false}
            type="default"
            adBlog={false}
          />
          <div className="my-2 border border-border-border-primary"></div>
          <BlogCard
            blog={blogs?.forYou[2]}
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
          desc="Book trip or chat with us on WhatsApp"
          url="https://wa.me/+233504099404?text=I%20saw%20your%20ad%20on%20CediRates"
        />
      </div>
    </div>
  );
};

export default StoriesForYou;
