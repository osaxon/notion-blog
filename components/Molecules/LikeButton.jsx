"use client";
import Emoji from "../../components/Atoms/Emoji";
import useContentMeta from "../../hooks/useContentMeta";
import { useState } from "react";
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
        <div className="flex relative flex-col items-center gap-y-2">
            <Emoji
                className={clsx(
                    "animate-bounce -z-50 text-xl -top-2 absolute",
                    animate ? "block" : "hidden"
                )}
                symbol="😻"
            />

            <button
                disabled={userLikes >= 5}
                onClick={() => handleClick()}
                className="bg-error scale-[2] origin-top-left clip-path-heart group -translate-x-1"
            >
                <div
                    className={clsx(
                        "bg-secondary w-10 group-hover:animate-pulse group-hover:animate-spin  transform-gpu h-10 bg-top transition-transform",
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
