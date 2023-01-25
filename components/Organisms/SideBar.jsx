"use client";
import React from "react";
import TableOfContents from "./TableOfContents";
import { LikeButton } from "@/components/Molecules";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = () => {
    const slug = usePathname().split("/")[1];

    return (
        <div className="flex border sticky top-20 flex-col justify-center items-center w-full">
            <TableOfContents />
            <LikeButton slug={slug} />
            <div>
                <BuyMeACoffee />
            </div>
        </div>
    );
};
1;

export default SideBar;
