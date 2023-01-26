"use client";
import Image from "next/image";
import Link from "next/link";
import {
    getPostCoverImage,
    getPostTitle,
    getPostSlug,
    getPostExcerpt,
} from "@/lib/helpers";
import {
    useBlogPostImages,
    useBlogPostActions,
} from "@/lib/context/blog-post-store";
import clsx from "clsx";
import React, { useEffect } from "react";

export default function FeaturedPosts({ posts }) {
    const images = useBlogPostImages();
    const { addImage } = useBlogPostActions();

    useEffect(() => {
        console.log(images);
    }, [images]);

    return (
        <section className="layout @container">
            <ul className="@lg:columns-3 columns-1 @md:columns-2 gap-4">
                {posts &&
                    posts.map((post, index) => {
                        const thisImage = images.filter(
                            (image) => image.url === getPostCoverImage(post)
                        )[0];
                        console.log(thisImage);
                        return (
                            <li className="relative" key={post.id}>
                                <Image
                                    key={post.id}
                                    alt="Cover image"
                                    width={600}
                                    height={
                                        thisImage?.height
                                            ? 450 / thisImage?.height
                                            : 450
                                    }
                                    className="object-cover mb-3"
                                    onLoadingComplete={(e) => {
                                        addImage({
                                            url: getPostCoverImage(post),
                                            width: e.naturalWidth,
                                            height: e.naturalHeight,
                                            ratio:
                                                e.naturalWidth /
                                                e.naturalHeight,
                                            orientation:
                                                e.naturalWidth > e.naturalHeight
                                                    ? "landscape"
                                                    : "portrait",
                                            zoomed: false,
                                        });
                                    }}
                                    src={getPostCoverImage(post)}
                                />
                                <Link
                                    className="absolute text-sm text-base-100 bottom-0 z-50 bg-primary"
                                    href="/"
                                >
                                    {getPostTitle(post)}
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}
