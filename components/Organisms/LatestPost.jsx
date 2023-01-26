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
                <div className="absolute p-4 border-dashed left-8 top-48 flex flex-col items-end gap-4">
                    <h2 className="font-serif text-base-100 font-bold italic text-3xl md:text-5xl mr-10">
                        Latest adventure...
                    </h2>
                    <h2 className="text-3xl md:text-5xl text-warning text-right bg-base-100 bg-opacity-40 backdrop-blur-sm font-bold uppercase">
                        {getPostTitle(post)}
                    </h2>
                    <p className="text-lg w-full font-mono italic bg-primary text-base-100 text-center">
                        {">>> " + getPostExcerpt(post) + " <<<"}
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
                        orientation:
                            e.naturalWidth > e.naturalHeight
                                ? "landscape"
                                : "portrait",
                    });
                }}
                className="object-cover w-full h-[70vh]"
                src={getPostCoverImage(post)}
            />
        </section>
    );
}
