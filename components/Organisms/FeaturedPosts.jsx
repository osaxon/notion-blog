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

export default function FeaturedPosts({ posts }) {
    const images = useBlogPostImages();
    const { addImage } = useBlogPostActions();

    return (
        <section className="layout @container">
            <ul className="grid grid-cols-1 @xl:grid-cols-2 gap-2">
                {posts &&
                    posts.map((post, index) => {
                        const thisImage = images.filter(
                            (image) => image.url === getPostCoverImage(post)
                        )[0];
                        return (
                            <Link
                                href={`/${getPostSlug(post)}`}
                                key={post.id}
                                id={`slide${index + 1}`}
                            >
                                <li className="group relative h-80 overflow-hidden">
                                    <Image
                                        alt="Cover image"
                                        fill
                                        className="object-cover group-hover:scale-[1.02] duration-200 ease-in-out transition-transform"
                                        src={getPostCoverImage(post)}
                                    />
                                </li>
                            </Link>
                        );
                    })}
            </ul>
        </section>
    );
}
