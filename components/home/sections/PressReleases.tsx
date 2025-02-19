import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import Poll from "../components/Poll";
import BlogCard from "../components/BlogCard";
import { Article, PollType } from "@/utils/types";
import Bar from "@/components/ui/bar";
import NewsCard from "../components/NewsCard";
import Divider from "@/components/ui/divider";

interface PressReleasesProps {
  blogs: {
    latestStories: Article[];
    forYou: Article[];
    pressReleases: Article[];
    topStories: Article[];
  };
  pollData: PollType;
}

const PressReleases: React.FC<PressReleasesProps> = ({ blogs, pollData }) => {
  return (
    <div className="gap-spacing-24">
      <div className="flex items-center gap-2">
        <Bar />
        <h2 className="font-semibold sm:text-header-h6-semibold gap-spacing-8">
          Press Releases
        </h2>
      </div>
      <div className="hidden sm:block my-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-spacing-24">
          <NewsCard blog={blogs?.pressReleases[0]} description={false} />
          <NewsCard blog={blogs?.pressReleases[1]} description={false} />
          <NewsCard blog={blogs?.pressReleases[2]} description={false} />
          <NewsCard blog={blogs?.pressReleases[3]} description={false} />
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:hidden my-6">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <BlogCard
            blog={blogs?.pressReleases[0]}
            main={false}
            type="pressRelease"
          />
          <div className="my-2 border border-border-border-primary"></div>
          <BlogCard
            blog={blogs?.pressReleases[1]}
            main={false}
            type="pressRelease"
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default PressReleases;
