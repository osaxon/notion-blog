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
        <section className="w-full relative">
            <Link href={`/${getPostSlug(post)}`}>
                <div className="absolute p-4 border-dashed left-8 md:hover:scale-[1.02] md:hover:bg-info duration-300 md:hover:bg-opacity-10 md:hover:shadow-lg md:hover:backdrop-blur-sm ease-in-out md:hover:border-2 transition-all origin-bottom-left top-48 flex flex-col gap-4">
                    <h2 className=" font-serif italic text-3xl md:text-5xl text-base-100 mr-10">
                        Latest adventure...
                    </h2>
                    <h2 className="text-3xl md:text-5xl text-right text-base-100 font-bold uppercase">
                        {getPostTitle(post)}
                    </h2>
                    <p className="text-lg italic bg-accent text-base-100">
                        {getPostExcerpt(post)}
                    </p>
                </div>
            </Link>
            <Image
                alt="Cover image"
                width={1280}
                height={thisImage?.height ? 720 / thisImage.height : 720}
                onLoadingComplete={(e) => {
                    addImage({
                        url: getPostCoverImage(post),
                        width: e.naturalWidth,
                        height: e.naturalHeight,
                        ratio: e.naturalWidth / e.naturalHeight,
                    });
                }}
                className="object-cover w-full h-[70vh]"
                src={getPostCoverImage(post)}
            />
        </section>
    );
}
