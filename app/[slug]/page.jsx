import Image from "next/image";
import React from "react";
import Link from "next/link";
import slugify from "slugify";
import Emoji from "@/components/Atoms/Emoji";
import { getSinglePost, getBlocks, getBySlug } from "@/utils/notion";
import { renderBlock, getHeadings } from "@/lib/helpers";

import LikeButton from "./LikeButton";

export default async function Page({ params: { slug } }) {
  // const post = await getSinglePost(id);
  const post = await getBySlug(slug);
  const blocks = await getBlocks(post.id);
  const headings = getHeadings(blocks);

  return (
    <main className="">
      <article className="">
        <h1 className="md:text-4xl text-2xl font-bold py-2">
          {post.icon !== null ? <Emoji symbol={post.icon.emoji} /> : null}
          {post.properties.Name.title[0].text.content}
        </h1>
        <div className="relative w-full h-80">
          {post.cover !== null ? (
            <Image
              fill
              className="object-cover absolute"
              alt=""
              src={
                post.cover.type === "external"
                  ? post.cover.external.url
                  : post.cover.type === "file"
                  ? post.cover.file.url
                  : null
              }
            />
          ) : null}
        </div>

        {blocks &&
          blocks.map((block) => (
            <React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>
          ))}
        <div className="flex">
          <LikeButton
            currentLikes={post.properties.Likes.number}
            postId={post.id}
          />
        </div>
      </article>
    </main>
  );
}

export const revalidate = 60;
