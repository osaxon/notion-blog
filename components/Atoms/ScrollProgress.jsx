"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                className="sticky top-0 left-0 z-50 h-2 origin-left bg-success"
                style={{ scaleX: scrollYProgress }}
                transition={{ type: "spring" }}
            />
        </>
    );
}
