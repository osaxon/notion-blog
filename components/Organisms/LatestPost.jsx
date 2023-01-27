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

export default function LatestPost({ post }) {
    const images = useBlogPostImages();
    const { addImage } = useBlogPostActions();
    const thisImage = images.filter(
        (image) => image.url === getPostCoverImage(post)
    )[0];

    return (
        <section className="w-full relative h-[70vh]">
            <Image
                alt="Cover image"
                width={1280}
                height={720}
                className="object-cover absolute w-full h-full"
                src={getPostCoverImage(post)}
            />
            <Link href={`/${getPostSlug(post)}`}>
                <div className="layout relative h-full">
                    <div className="absolute group hover:backdrop-blur-sm transition-all bottom-40 flex flex-col items-center lg:items-start gap-8 lg:w-2/3 w-full">
                        <h2 className="font-serif text-base-100 font-bold italic text-5xl lg:text-6xl mr-10">
                            Latest adventure...
                        </h2>
                        <h2 className="text-5xl lg:self-end lg:text-8xl text-warning font-bold uppercase">
                            {getPostTitle(post)}
                        </h2>
                        <p className="text-lg md:text-2xl w-full font-mono italic bg-primary text-base-100 text-center group-hover:bg-warning">
                            {">>> " + getPostExcerpt(post) + " <<<"}
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    );
}
