"use client";
import Link from "next/link";
import clsx from "clsx";
import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import useContentMeta from "@/hooks/useContentMeta";
import React, { useState } from "react";
import { getPostCoverImage, getPostSlug, getPostExcerpt } from "@/lib/helpers";

const FeaturedCard = ({ post }) => {
    const [isLoading, setLoading] = useState(true);
    const slug = getPostSlug(post);
    const { likes } = useContentMeta(slug);
    return (
        <div className="relative block h-96">
            <Link
                className="font-mono items-center flex gap-3 bg-primary-content bg-opacity-80 z-50 absolute bottom-10 text-2xl"
                href={`/${slug}`}
            >
                {getPostExcerpt(post)}
                <div className="flex items-center gap-2 opacity-70">
                    <Emoji className="text-3xl" symbol="♥︎" />
                    <span>{likes}</span>
                </div>
            </Link>
            <Image
                key={post.id}
                alt="Cover image"
                fill
                sizes="(max-width: 768px) 100vw,
                                            (max-width: 1200px) 50vw,
                                            33vw"
                className={clsx(
                    "object-cover mb-3",
                    isLoading
                        ? "grayscale blur-2xl scale-110"
                        : "grayscale-0 blur-0 scale-100"
                )}
                onLoadingComplete={(e) => {
                    setLoading(false);
                }}
                src={getPostCoverImage(post)}
            />
        </div>
    );
};

export default FeaturedCard;
