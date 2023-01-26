"use client";
import Image from "next/image";
import { useState } from "react";
import {
    useZoomedImageURL,
    useIsZoomed,
    useBlogPostActions,
    useBlogPostImages,
} from "@/lib/context/blog-post-store";
import clsx from "clsx";

const ZoomedImageBackDrop = ({ children }) => {
    const zoomedImageURL = useZoomedImageURL();
    const images = useBlogPostImages();
    const { setZoomedImg, toggleZoom } = useBlogPostActions();
    const isZoomed = useIsZoomed();
    let thisImage = images.filter((image) => image.url === zoomedImageURL)[0];

    return (
        <div
            onClick={() => {
                toggleZoom();
                setZoomedImg(undefined);
            }}
            className={clsx(
                !isZoomed
                    ? "hidden scale-0"
                    : "fixed bg-zinc-800 scale-105 bg-opacity-70 flex justify-center w-screen h-screen items-center p-10 backdrop-blur-md z-50 top-0 left-0"
            )}
        >
            <Image
                width={thisImage?.width}
                height={thisImage?.height}
                src={zoomedImageURL}
                className="object-contain max-h-screen p-10"
                alt=""
            />
        </div>
    );
};

export default ZoomedImageBackDrop;
