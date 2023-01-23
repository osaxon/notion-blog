"use client";
import React, { useEffect } from "react";
import TableOfContents from "./TableOfContents";
import LikeButton from "@/app/[slug]/LikeButton";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = () => {
    const slug = usePathname().split("/")[1];

    return (
        <aside className="md:ml-4 md:border-l border border-t md:border-t-0 md:px-4 py-4 border-primary-content md:block md:basis-40 md:shrink-0">
            <div className="w-full md:sticky relative md:top-5 gap-y-16 md:h-[450px] flex flex-row justify-evenly md:justify-between md:flex-col">
                <TableOfContents />
                <div className="flex flex-col justify-between">
                    <LikeButton slug={slug} />
                    <BuyMeACoffee />
                </div>
            </div>
        </aside>
    );
};
1;

export default SideBar;
