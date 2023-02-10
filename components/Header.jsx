"use client";
import Link from "next/link";
import Donut from "./Icons/Donut";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import siteConfig from "../site.config";
import { Fredericka_the_Great } from "@next/font/google";

const fredrickaTheGreat = Fredericka_the_Great({
    subsets: ["latin"],
    weight: "400",
});

const navLinks = siteConfig.navMenu;

const itemVariants = {
    closed: {
        opacity: 0,
    },
    open: {
        opacity: 1,
    },
};

export default function Header() {
    const [open, cycleOpen] = useCycle(false, true);
    const pathname = usePathname();
    const [isHome, setIsHome] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    //useEffect that detects if window is scrolled > 5px on the Y axis
    useEffect(() => {
        if (isHome) {
            const detectScrollY = () => {
                if (window.scrollY > 5) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            };

            window.addEventListener("scroll", detectScrollY);

            return () => {
                window.removeEventListener("scroll", detectScrollY);
            };
        }
    }, [isHome]);

    useEffect(() => {
        pathname === "/" ? setIsHome(true) : setIsHome(false);
    }, [pathname]);

    return (
        <div
            className={clsx("group relative inset-x-0 top-0 z-50", {
                "!fixed": isHome,
            })}
        >
            <header
                className={clsx(
                    "relative mx-auto h-16 border-b border-transparent bg-transparent transition-colors duration-200 group-hover:bg-base-100",
                    {
                        "bg-base-100": !isHome || isScrolled,
                    }
                )}
            >
                <nav
                    className={clsx(
                        "hidden h-full items-center justify-between px-4 font-bold leading-5 transition-colors duration-200 md:flex",
                        {
                            "text-base-100 group-hover:text-primary":
                                isHome && !isScrolled,
                        }
                    )}
                >
                    <div className="flex h-full w-full items-center justify-between">
                        <Link
                            className="flex items-center gap-2 text-4xl font-semibold uppercase leading-[36px] tracking-wider"
                            href="/"
                        >
                            <motion.div whileHover={{ rotate: 60 }}>
                                <Donut className="fill-warning stroke-primary" />
                            </motion.div>
                            <span className={fredrickaTheGreat.className}>
                                {siteConfig.name}
                            </span>
                        </Link>
                        <ul className="flex gap-x-4">
                            {navLinks.length > 0 &&
                                navLinks.map((l) => (
                                    <li key={l.title}>
                                        <Link
                                            className="text-2xl font-semibold uppercase leading-[36px]"
                                            href={l.href}
                                        >
                                            {l.title}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </nav>
                <div className="flex h-16 items-center px-4 md:hidden">
                    <button onClick={cycleOpen}>
                        <motion.div whileHover={{ rotate: 60 }}>
                            <Donut className="fill-warning stroke-primary" />
                        </motion.div>
                    </button>
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.aside
                            className="h-screen min-h-full bg-base-100"
                            initial={{ width: 0 }}
                            animate={{
                                width: "calc(66vw)",
                            }}
                            exit={{
                                width: 0,
                                transition: { delay: 0.2, duration: 0.2 },
                            }}
                            transition={{
                                type: "spring",
                            }}
                        >
                            <motion.div
                                className="flex flex-col gap-6 p-3 text-3xl font-bold"
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {navLinks.map(({ title, href, id }) => (
                                    <motion.a
                                        key={id}
                                        href={href}
                                        variants={itemVariants}
                                    >
                                        {title}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </header>
        </div>
    );
}
