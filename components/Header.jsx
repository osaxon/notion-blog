"use client";
import Link from "next/link";
import Logo from "./Icons/Logo";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
    const [subOpen, cycleSubOpen] = useCycle(false, true);
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
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Logo className="fill-warning stroke-primary" />
                            </motion.div>
                            <span>{siteConfig.name}</span>
                        </Link>
                        <ul className="flex gap-x-4">
                            {navLinks.length > 0 &&
                                navLinks.map((l) => {
                                    if (l.hasChildren) {
                                        return (
                                            <div
                                                key={l.id}
                                                className="dropdown-end dropdown"
                                            >
                                                <button
                                                    tabIndex={0}
                                                    className="text-2xl font-semibold uppercase leading-[36px]"
                                                >
                                                    Places
                                                </button>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu rounded-box w-52 bg-base-100 p-2"
                                                >
                                                    {l.children.map((c) => (
                                                        <Link
                                                            key={c.id}
                                                            href={c.href}
                                                            className="my-2 text-xl font-semibold uppercase leading-5"
                                                        >
                                                            {c.title}
                                                        </Link>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    }
                                    return (
                                        <li key={l.title}>
                                            <Link
                                                className="text-2xl font-semibold uppercase leading-[36px]"
                                                href={l.href}
                                            >
                                                {l.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </nav>
                <div className="flex h-16 items-center justify-between px-4 md:hidden">
                    <button onClick={cycleOpen}>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Logo className="fill-warning stroke-primary" />
                        </motion.div>
                    </button>
                    <div className="w-full text-center text-4xl">
                        <span className="text-3xl font-bold">
                            {siteConfig.name}
                        </span>
                    </div>
                </div>

                {/* Mobile Menu */}
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
                                {navLinks.map(
                                    ({
                                        title,
                                        href,
                                        id,
                                        hasChildren,
                                        children,
                                    }) => {
                                        if (hasChildren) {
                                            return (
                                                <motion.a
                                                    onClick={cycleSubOpen}
                                                    key={id}
                                                    className="cursor-pointer"
                                                    variants={itemVariants}
                                                >
                                                    {title}
                                                    <AnimatePresence>
                                                        {subOpen ? (
                                                            <motion.div
                                                                initial={{
                                                                    height: 0,
                                                                }}
                                                                animate={{
                                                                    height: "calc(33vh)",
                                                                }}
                                                                exit={{
                                                                    height: 0,
                                                                    transition:
                                                                        {
                                                                            delay: 0.2,
                                                                            duration: 0.2,
                                                                        },
                                                                }}
                                                                transition={{
                                                                    type: "spring",
                                                                }}
                                                            >
                                                                <motion.div
                                                                    animate="open"
                                                                    exit="closed"
                                                                    initial="closed"
                                                                    className="flex flex-col items-start gap-4 p-3 text-xl font-bold"
                                                                >
                                                                    {children.map(
                                                                        (c) => (
                                                                            <motion.a
                                                                                key={
                                                                                    c.id
                                                                                }
                                                                                href={
                                                                                    c.href
                                                                                }
                                                                                variants={
                                                                                    itemVariants
                                                                                }
                                                                            >
                                                                                {
                                                                                    c.title
                                                                                }
                                                                            </motion.a>
                                                                        )
                                                                    )}
                                                                </motion.div>
                                                            </motion.div>
                                                        ) : null}
                                                    </AnimatePresence>
                                                </motion.a>
                                            );
                                        }

                                        return (
                                            <motion.a
                                                key={id}
                                                href={href}
                                                variants={itemVariants}
                                            >
                                                {title}
                                            </motion.a>
                                        );
                                    }
                                )}
                            </motion.div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </header>
        </div>
    );
}
