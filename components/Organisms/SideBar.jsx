"use client";
import React from "react";
import TableOfContents from "./TableOfContents";
import { LikeButton } from "@/components/Molecules";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = () => {
    const slug = usePathname().split("/")[1];

    return (
        <aside className="md:ml-4 md:px-4 py-4 md:block md:basis-40 md:shrink-0 md:max-w-[160px]">
            <div className="w-full md:sticky relative md:top-52 gap-y-16 md:h-[450px] flex flex-row justify-evenly md:justify-between md:flex-col">
                <TableOfContents />
                <div className="flex flex-col justify-evenly h-[160px]">
                    <LikeButton slug={slug} />
                    <BuyMeACoffee />
                </div>
            </div>
        </aside>
    );
};
1;

export default SideBar;
