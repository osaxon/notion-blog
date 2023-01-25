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

    function nextSlide(current) {
        const total = posts.length;
        if (current < posts.length) {
            return current + 1;
        } else if (current == posts.length) {
            return 1;
        }
    }

    function previousSlide(current) {
        const total = posts.length;
        if (current > 1) {
            return current - 1;
        } else if (current == 1) {
            return posts.length;
        }
    }

    return (
        <section className="h-[90vh] w-full relative">
            <div className="absolute inset-0">
                <ul className="carousel w-full">
                    {posts &&
                        posts.map((post, index) => {
                            const thisImage = images.filter(
                                (image) => image.url === getPostCoverImage(post)
                            )[0];
                            return (
                                <li
                                    className="carousel-item relative w-full"
                                    key={post.id}
                                    id={`slide${index + 1}`}
                                >
                                    <Image
                                        alt="Cover image"
                                        width={1280}
                                        height={
                                            thisImage?.height
                                                ? 720 / thisImage.height
                                                : 720
                                        }
                                        onLoadingComplete={(e) => {
                                            addImage({
                                                url: getPostCoverImage(post),
                                                width: e.naturalWidth,
                                                height: e.naturalHeight,
                                                ratio:
                                                    e.naturalWidth /
                                                    e.naturalHeight,
                                            });
                                        }}
                                        className="object-cover w-full h-[90vh]"
                                        src={getPostCoverImage(post)}
                                    />

                                    {/* Carousel Navigation */}
                                    <nav className="layout absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                        <a
                                            href={`#slide${previousSlide(
                                                index + 1
                                            )}`}
                                            className="btn btn-circle btn-sm text-base-content bg-secondary-content border-0 bg-opacity-50"
                                        >
                                            ❮
                                        </a>
                                        <a
                                            href={`#slide${nextSlide(
                                                index + 1
                                            )}`}
                                            className="btn btn-circle btn-sm text-base-content bg-secondary-content border-0 bg-opacity-50"
                                        >
                                            ❯
                                        </a>
                                    </nav>

                                    {/* Image caption and link */}
                                    <div className="flex bottom-0 absolute items-end w-full">
                                        <div className="w-full bg-zinc-900">
                                            <Link
                                                href={`/${getPostSlug(post)}`}
                                            >
                                                <div className="text-base-100 layout">
                                                    <h2 className="text-3xl font-bold">
                                                        {getPostTitle(post)}
                                                    </h2>
                                                    <p className="text-2xl">
                                                        {getPostExcerpt(post)}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </section>
    );
}
