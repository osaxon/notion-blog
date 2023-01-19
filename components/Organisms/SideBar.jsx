"use client";
import React, { useEffect } from "react";
import TableOfContents from "./TableOfContents";
import LikeButton from "@/app/[slug]/LikeButton";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = () => {
    const slug = usePathname().split("/")[1];

    return (
        <aside className="hidden ml-4 md:block basis-44 lg:basis-60 shrink-0">
            <div className="w-full sticky top-20 justify-evenly h-[450px] flex flex-col ">
                <TableOfContents />
                <LikeButton slug={slug} />
                <BuyMeACoffee />
            </div>
        </aside>
    );
};
1;

export default SideBar;
