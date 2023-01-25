"use client";
import React from "react";
import TableOfContents from "./TableOfContents";
import { LikeButton } from "@/components/Molecules";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = () => {
    const slug = usePathname().split("/")[1];

    return (
        <div className="flex border flex-col w-full py-10">
            <LikeButton slug={slug} />
            <BuyMeACoffee />
        </div>
    );
};
1;

export default SideBar;
