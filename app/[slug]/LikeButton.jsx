"use client";
import { FiHeart } from "react-icons/fi";
import useContentMeta from "@/hooks/useContentMeta";
import { useEffect } from "react";
import clsx from "clsx";

const LikeButton = ({ slug }) => {
    const { likes, addLike, mutateStatus, userLikes } = useContentMeta(slug);

    return (
        <div className="flex items-end space-x-2">
            <button
                disabled={userLikes >= 5}
                onClick={addLike}
                className="bg-accent clip-path-heart scale-150 translate-x-2"
            >
                <div
                    className={clsx(
                        "bg-primary w-8 h-8 bg-top transition-transform duration-200",
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
                            : ""
                    )}
                ></div>
            </button>
            <span className="font-mono opacity-40 text-base-content">
                {likes}
            </span>
        </div>
    );
};

export default LikeButton;
