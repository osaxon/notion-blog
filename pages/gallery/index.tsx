import type { NextPage } from "next";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { extractTags } from "../../utils/extractTags";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import getImages from "../../lib/getImages";
import type { ImageProps } from "../../utils/types";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";

const Home = ({ images, tags }) => {
    const router = useRouter();
    const { photoId } = router.query;
    const { loc } = router.query;
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

    return (
        <>
            <Head>
                <title>SE Asia Photos | OG Travel Blog</title>
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                {photoId && (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId);
                        }}
                    />
                )}
                <nav className="z-50 py-2 text-center">
                    <Link
                        className="font-mono text-2xl font-bold uppercase text-base-100"
                        href="/"
                    >
                        Home
                    </Link>

                    {tags.map((t) => (
                        <Link
                            key={t}
                            className="text-white"
                            href={`/gallery/?loc=${t}`}
                            shallow
                        >
                            {t}
                        </Link>
                    ))}
                    <Link href="/gallery" shallow>
                        Clear
                    </Link>
                </nav>
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    {images
                        .filter((img) =>
                            loc
                                ? img.tags.includes(loc)
                                : img.tags.includes(...tags)
                        )
                        .map(({ id, public_id, format }) => (
                            <Link
                                key={id}
                                href={`/gallery/?photoId=${id}`}
                                as={`/gallery/p/${id}`}
                                ref={
                                    id === Number(lastViewedPhoto)
                                        ? lastViewedPhotoRef
                                        : null
                                }
                                shallow
                                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                            >
                                <Image
                                    alt=""
                                    className="transform rounded-sm brightness-90 transition will-change-auto group-hover:brightness-110"
                                    style={{
                                        transform: "translate3d(0, 0, 0)",
                                    }}
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                                    width={720}
                                    height={480}
                                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                                />
                            </Link>
                        ))}
                </div>
            </main>
            <footer className="p-6 text-center  sm:p-12">
                <Link
                    className="font-mono text-2xl font-bold uppercase text-base-100"
                    href="/"
                >
                    Home
                </Link>
            </footer>
        </>
    );
};

export default Home;

export async function getStaticProps() {
    const images = await getImages();

    return {
        props: {
            images,
            tags: extractTags(images),
        },
        revalidate: 60,
    };
}
