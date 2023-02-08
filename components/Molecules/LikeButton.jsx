"use client";
import {
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share";
import { motion, transform, AnimatePresence } from "framer-motion";
import useContentMeta from "../../hooks/useContentMeta";
import { useEffect } from "react";

const LikeButton = ({ slug, tags }) => {
    const { likes, addLike, mutateStatus, userLikes } = useContentMeta(slug);
    const heartFill = transform([0, 8], ["10%", "100%"])(likes);

    useEffect(() => console.log(tags));

    return (
        <div className="flex items-start justify-center gap-2 py-6">
            <motion.button
                disabled={likes >= 8}
                onClick={() => addLike()}
                className="clip-path-heart relative flex h-11 w-14 justify-center bg-warning"
            >
                <AnimatePresence>
                    {mutateStatus === "loading" && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0, translateY: -30 }}
                            transition={{ ease: "easeOut", duration: 2 }}
                            className=" text-center font-mono text-xs italic text-success-content opacity-70"
                        >
                            <p>+1</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    animate={{ height: heartFill }}
                    className="absolute bottom-0 -z-50 w-full bg-success"
                />
            </motion.button>
            <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_URL}/${slug}`}
                quote={`Check out this article`}
                hashtags={tags}
                className="rounded-full"
            >
                <TwitterIcon className="h-11 w-11 rounded-full" />
            </TwitterShareButton>
            <EmailShareButton url={`${process.env.NEXT_PUBLIC_URL}/${slug}`}>
                <EmailIcon className="h-11 w-11 rounded-full" />
            </EmailShareButton>
        </div>
    );
};

export default LikeButton;
