import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getPostsByTag } from "@/utils/notion";
import { getPostCoverImage } from "@/lib/helpers";

export default async function FilteredPosts({ title, tag }) {
  const { posts } = await getPostsByTag(tag);
  return (
    <section className="flex flex-col gap-2 items-start w-screen">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="carousel gap-2 ">
        {posts &&
          posts.map((post) => (
            <li className="carousel-item" key={post.id}>
              <Link href={`/${post.id}`}>
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
