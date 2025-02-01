import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import { HomePage } from "@/components/home/HomePage";
import { MobileNav } from "@/components/mobile-nav";
import Header from "@/components/navbar/Header";
import { getAllBlogs, getAllPolls, getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

const Page = async () => {
  const user = await getUser(cookies().toString());
  const pollsResponse = await getAllPolls();
  const articlesResponse = await getAllBlogs();

  const { data: articlesData = [] } = articlesResponse || {};
  const { data: pollsData = [] } = pollsResponse || {};

  return (
    <>
      <GoogleOneTapLogin user={user} />
      <Header user={user} />
      <HomePage user={user} blogs={articlesData} pollData={pollsData} />
      <MobileNav user={user} />
    </>
  );
};

export default Page;
