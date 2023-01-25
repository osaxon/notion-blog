"use client";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
    useMobileMenu,
    useMobileMenuActions,
} from "@/lib/context/mobile-menu-store";
import MobileMenu from "./Molecules/MobileMenu";
import siteConfig from "../site.config";

const navLinks = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "All Posts",
        href: "/",
    },
    {
        title: "Places",
        href: "/",
    },
    {
        title: "Transport",
        href: "/",
    },
];

export default function Header() {
    const pathname = usePathname();
    const [isHome, setIsHome] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isOpen = useMobileMenu();
    const { toggle, open, close } = useMobileMenuActions();

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
            className={clsx("sticky top-0 inset-x-0 z-50 group", {
                "!fixed": isHome,
            })}
        >
            <header
                className={clsx(
                    "relative h-16 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:backdrop-blur-md",
                    {
                        "!backdrop-blur-md": !isHome || isScrolled,
                    }
                )}
            >
                <nav
                    className={clsx(
                        "text-white layout items-center justify-between h-full text-xs leading-5 font-normal transition-colors duration-200 hidden md:flex",
                        {
                            "group-hover:text-error": isHome && !isScrolled,
                        }
                    )}
                >
                    <div className="flex items-center h-full w-full justify-between">
                        <Link
                            className="text-2xl leading-[36px] font-semibold uppercase"
                            href="/"
                        >
                            {siteConfig.name}
                        </Link>
                        <ul className="flex gap-x-4">
                            {navLinks.length > 0 &&
                                navLinks.map((l) => (
                                    <li key={l.title}>
                                        <Link
                                            className="text-xl hover:underline leading-[36px] font-semibold uppercase"
                                            href={l.href}
                                        >
                                            {l.title}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </nav>
                <nav className="flex items-center layout h-full md:hidden">
                    <MobileMenu links={navLinks} />
                </nav>
            </header>
        </div>
    );
}
