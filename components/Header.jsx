"use client";
import Link from "next/link";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
    useMobileMenu,
    useMobileMenuActions,
} from "../lib/context/mobile-menu-store";
import MobileMenu from "./Molecules/MobileMenu";
import siteConfig from "../site.config";

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
                    "relative mx-auto h-16 border-b border-transparent bg-transparent transition-colors duration-200 group-hover:backdrop-blur-md",
                    {
                        "bg-base-100 bg-opacity-50 backdrop-blur-md":
                            !isHome || isScrolled,
                    }
                )}
            >
                <nav
                    className={clsx(
                        "hidden h-full items-center justify-between px-4 font-bold leading-5 transition-colors duration-200 lg:flex",
                        {
                            "text-base-100 group-hover:text-primary":
                                isHome && !isScrolled,
                        }
                    )}
                >
                    <div className="flex h-full w-full items-center justify-between">
                        <Link
                            className="text-3xl font-semibold uppercase leading-[36px]"
                            href="/"
                        >
                            {siteConfig.name}
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

                {/* <nav className="layout flex h-full items-center lg:hidden">
                    <MobileMenu links={navLinks} />
                </nav> */}
                <div className="lg:hidden">
                    <button onClick={cycleOpen}>
                        {open ? "Close" : "Open"}
                    </button>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.aside
                            className="relative z-50 my-10 h-screen min-h-full bg-info"
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
                                className=""
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {navLinks.map(({ title, href, id }) => (
                                    <motion.a
                                        key={id}
                                        href={href}
                                        whileHover={{ scale: 1.1 }}
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
