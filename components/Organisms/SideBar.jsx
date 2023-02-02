"use client";
import React from "react";
import TableOfContents from "./TableOfContents";
import { LikeButton } from "../../components/Molecules";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = () => {
    const slug = usePathname().split("/")[1];

    return (
        <div className="flex sticky top-20 flex-col w-full gap-20">
            <TableOfContents />

            <div className="flex border flex-col gap-4">
                <LikeButton slug={slug} />
                <BuyMeACoffee />
            </div>
        </div>
    );
};
1;

export default SideBar;
