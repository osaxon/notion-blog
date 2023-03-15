"use client";
import Image from "next/image";
import Link from "next/link";
import {
    getPostCoverImage,
    getPostTitle,
    getPostSlug,
    getPostExcerpt,
} from "../../lib/helpers";
// import {
//     useBlogPostImages,
//     useBlogPostActions,
// } from "../../lib/context/blog-post-store";

export default function LatestPost({ post }) {
    // const images = useBlogPostImages();
    // const { addImage } = useBlogPostActions();
    // const thisImage = images.filter(
    //     (image) => image.url === getPostCoverImage(post)
    // )[0];

    return (
        <section className="relative h-[70vh] w-full">
            <Image
                alt="Cover image"
                width={1280}
                height={720}
                className="absolute h-full w-full object-cover"
                src={getPostCoverImage(post)}
                priority={true}
            />
            <Link href={`/${getPostSlug(post)}`}>
                <div className="layout relative h-full">
                    <div className="group absolute bottom-40 flex w-full flex-col items-center gap-8 transition-all lg:bottom-24 lg:w-2/3 lg:items-start">
                        <h2 className="text-5xl font-bold uppercase text-warning lg:self-end lg:text-8xl">
                            {getPostTitle(post)}
                        </h2>
                        <p className="w-full bg-primary text-center font-mono text-lg italic text-base-100 group-hover:bg-warning md:text-2xl">
                            {">>> " + getPostExcerpt(post) + " <<<"}
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    );
}
