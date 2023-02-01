"use client";
import React from "react";
import LikeButton from "../Molecules/LikeButton";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";
import TableOfContents from "./TableOfContents";
import { usePathname } from "next/navigation";

const PostFooter = () => {
    const slug = usePathname().split("/")[1];
    return (
        <aside className="flex flex-col gap-8 sm:hidden items-center py-10">
            <TableOfContents />
            <LikeButton slug={slug} />
            <BuyMeACoffee />
        </aside>
    );
};

export default PostFooter;
