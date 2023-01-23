"use client";
import Emoji from "@/components/Atoms/Emoji";
import { FiHeart } from "react-icons/fi";
import useContentMeta from "@/hooks/useContentMeta";
import { useEffect, useState } from "react";
import clsx from "clsx";

const LikeButton = ({ slug }) => {
    const { likes, addLike, mutateStatus, userLikes } = useContentMeta(slug);
    const [animate, setAnimate] = useState(false);

    function handleClick() {
        addLike();
        if (userLikes >= 4) {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
            }, 2500);
        }
    }

    return (
        <div className="flex relative justify-center">
            <Emoji
                className={clsx(
                    "animate-bounce z-50 text-xl absolute left-4 bottom-6",
                    animate ? "block" : "hidden"
                )}
                symbol="😻"
            />
            <button
                disabled={userLikes >= 5}
                onClick={() => handleClick()}
                className="bg-accent clip-path-heart h-10 w-10 group hover:bg-accent-focus md:translate-x-2"
            >
                <div
                    className={clsx(
                        "bg-primary w-10 group-hover:bg-primary-focus h-10 bg-top transition-transform duration-200",
                        userLikes === 0
                            ? "translate-y-8"
                            : userLikes === 1
                            ? "translate-y-4"
                            : userLikes === 2
                            ? "translate-y-3"
                            : userLikes === 3
                            ? "translate-y-2"
                            : userLikes === 4
                            ? "translate-y-1"
                            : userLikes === 5
                            ? "translate-y-0"
                            : mutateStatus === "loading"
                            ? "animate-pulse"
                            : ""
                    )}
                />
            </button>
            <span className="font-mono select-none opacity-40 text-base-content">
                {likes}
            </span>
        </div>
    );
};

export default LikeButton;
