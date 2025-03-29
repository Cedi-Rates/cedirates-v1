import GoogleOneTapLogin from "@/components/auth/GoogleOneTapLogin";
import { Blog } from "@/components/home/blog";
import Header from "@/components/navbar/Header";
import NavbarLight from "@/components/navbar/NavbarLight";
import { Missing } from "@/components/notFound/notfound";
import { getAllBlogs, getBlog, getUser } from "@/utils/helpers/api";
import { generateSchema } from "@/utils/schema";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const articles = await getBlog(params.slug);
  const { data } = articles;

  return {
    title: data?.title,
    description: data?.summary,
    openGraph: {
      title: data?.title,
      description: data?.summary,
      images: [data?.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.summary,
      site: "@CediRates",
      images: [data?.image],
    },
    alternates: {
      canonical: `https://cedirates.com/news/${data?.slug}/`,
    },
  };
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getUser(cookies().toString());
  const articles = await getBlog(params.slug);
  const { data } = articles;
  const schema = generateSchema("article", data);

  if (!data) {
    return <Missing />;
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GoogleOneTapLogin user={user} />
      <Header user={user} />
      <Blog blog={data} />
    </div>
  );
};

export default BlogPage;
