"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import useKeypress from "react-use-keypress";
import { SharedModal } from "../Molecules";
import {
    useGalleryActions,
    useLastViewedPhoto,
} from "@/lib/context/gallery-store";

export default function Carousel({ index, currentPhoto }) {
    const router = useRouter();
    const lastViewedPhoto = useLastViewedPhoto();
    const { setPhoto } = useGalleryActions();

    function closeModal() {
        setPhoto(currentPhoto.id);
        router.push("/", undefined, { shallow: true });
    }

    function changePhotoId(newVal) {
        return newVal;
    }

    useKeypress("Escape", () => {
        closeModal();
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <button
                className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
                onClick={closeModal}
            >
                <Image
                    src={currentPhoto}
                    className="pointer-events-none h-full w-full"
                    alt="blurred background"
                    fill
                    priority={true}
                />
            </button>
            <SharedModal
                index={index}
                changePhotoId={changePhotoId}
                currentPhoto={currentPhoto}
                closeModal={closeModal}
                navigation={false}
            />
        </div>
    );
}
