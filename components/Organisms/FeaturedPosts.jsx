import Image from "next/image";
import React from "react";
import Link from "next/link";
import Emoji from "../Atoms/Emoji";
import {
  getFeaturedPosts,
  getPostsByTag,
  getTags,
  likePage,
} from "@/utils/notion";
import { getPostCoverImage } from "@/lib/helpers";
import { ScreenSizes, ContainerSizes } from "../Atoms/TailwindContainerSizes";

export default async function FeaturedPosts() {
  const { posts } = await getFeaturedPosts();
  return (
    <section className="flex flex-col gap-2 items-start w-screen mb-6">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      <ul className="carousel gap-2 ">
        {posts &&
          posts.map((post) => (
            <li className="carousel-item" key={post.id}>
              <Link href={`/${post.properties.Slug.formula.string}`}>
                <div className="relative">
                  <Image
                    src={getPostCoverImage(post)}
                    alt="cover image"
                    width={400}
                    height={300}
                    className="object-cover -z-50"
                  />
                  <p className="md:text-2xl text-xl absolute bottom-0 px-2 bg-zinc-400 bg-opacity-50 text-zinc-50 font-bold">
                    {post.properties.Name.title[0].plain_text}
                  </p>
                </div>
              </Link>
              <Link href={`/`}></Link>
              {/* <button onClick={(1, post.id)}>
                <Emoji symbol={"❤️"} />
              </button> */}
            </li>
          ))}
      </ul>
      <Link
        className="font-bold text-xl text-zinc-50 bg-zinc-900 py-1 px-2 hover:bg-zinc-800 transition-all mt-2"
        href="/posts"
      >
        View More
      </Link>
    </section>
  );
}
