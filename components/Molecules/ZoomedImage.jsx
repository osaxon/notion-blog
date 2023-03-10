"use client";
import Image from "next/image";
import {
    useZoomedImageURL,
    useIsZoomed,
    useBlogPostActions,
    useBlogPostImages,
} from "../../lib/context/blog-post-store";
import clsx from "clsx";

const ZoomedImageBackDrop = ({ children }) => {
    const zoomedImageURL = useZoomedImageURL();
    const images = useBlogPostImages();
    const { setZoomedImg, toggleZoom } = useBlogPostActions();
    const isZoomed = useIsZoomed();
    let thisImage = images.filter((image) => image.url === zoomedImageURL)[0];
    if (!zoomedImageURL) return null;

    return (
        <div
            onClick={() => {
                toggleZoom();
                setZoomedImg(undefined);
            }}
            className={clsx(
                !isZoomed
                    ? "hidden scale-0 "
                    : "fixed bg-zinc-800 transition-all scale-105 bg-opacity-70 flex justify-center w-screen h-screen items-center p-10 backdrop-blur-md z-50 top-0 left-0"
            )}
        >
            <Image
                width={thisImage?.width}
                height={thisImage?.height}
                src={zoomedImageURL}
                className={clsx(
                    "object-contain cursor-zoom-out",
                    thisImage.orientation === "landscape"
                        ? "w-screen h-auto py-10"
                        : "h-screen w-auto px-10"
                )}
                alt=""
            />
        </div>
    );
};

export default ZoomedImageBackDrop;
