"use client";
import React from "react";
import NewsletterForm from "../Molecules/NewsletterForm";
import { LikeButton } from "../../components/Molecules";
import { usePathname } from "next/navigation";
import BuyMeACoffee from "../Atoms/BuyMeACoffee";

const SideBar = ({ tags }) => {
    const slug = usePathname().split("/")[1];

    return (
        <aside className="w-full md:min-w-max">
            <div className="sticky top-20 flex w-full flex-col gap-20">
                <div className="flex flex-col items-center gap-4">
                    <LikeButton tags={tags} slug={slug} />
                    <NewsletterForm />
                    <BuyMeACoffee />
                </div>
            </div>
        </aside>
    );
};
1;

export default SideBar;
