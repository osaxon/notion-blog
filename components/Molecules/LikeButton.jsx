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

const LikeButton = ({ slug }) => {
    const { likes, addLike, mutateStatus, userLikes } = useContentMeta(slug);
    const heartFill = transform([0, 8], ["2%", "100%"])(userLikes);

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <p className="font-mono text-base-content opacity-70">{likes}</p>

            <motion.button
                disabled={userLikes >= 8}
                onClick={() => addLike()}
                className="clip-path-heart relative flex h-11 w-14 translate-x-[0.2rem] justify-center bg-warning"
            >
                <AnimatePresence>
                    {mutateStatus === "loading" && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0, translateY: -45 }}
                            transition={{ ease: "easeOut", duration: 5 }}
                            className="absolute top-2 z-50 text-center font-mono text-base italic  opacity-70"
                        >
                            <p className="text-success-content">+1</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    animate={{ height: heartFill }}
                    className="absolute bottom-0 -z-50 w-full bg-success"
                />
            </motion.button>
        </div>
    );
};

export default LikeButton;
