"use client";
import Image from "next/image";
import {
    useZoomedImageURL,
    useIsZoomed,
    useBlogPostActions,
} from "@/lib/context/blog-post-store";

const ZoomedImage = () => {
    const zoomedImageURL = useZoomedImageURL();
    const { zoom } = useBlogPostActions();
    const isZoomed = useIsZoomed();
    if (!isZoomed) return null;

    return (
        <figure
            onClick={() => zoom({ zoomedImageURL, zoomed: false })}
            className="fixed bg-neutral bg-opacity-50 flex justify-center items-center px-4 backdrop-blur-md z-50 top-0 left-0 w-screen h-screen"
        >
            <Image
                src={zoomedImageURL}
                fill
                alt={zoomedImageURL}
                className="object-contain"
            />
        </figure>
    );
};

export default ZoomedImage;
