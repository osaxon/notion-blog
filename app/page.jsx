import Image from "next/image";
import { Inter } from "@next/font/google";
import React from "react";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import { getPosts, getTags } from "@/utils/notion";
import FeaturedPosts from "@/components/Organisms/FeaturedPosts";
import FilteredPosts from "@/components/Organisms/FilteredPosts";

export default async function Home() {
  const { posts } = await getPosts();
  const tags = getTags(posts);
  return (
    <main className="mx-auto w-11/12 max-w-[95%]">
      <FeaturedPosts />
      {tags &&
        tags.map((tag) => (
          <React.Fragment key={tag}>
            <FilteredPosts tag={tag} title={tag} />
          </React.Fragment>
        ))}
    </main>
  );
}
