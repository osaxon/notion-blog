import Image from "next/image";
import { Inter } from "@next/font/google";
import React from "react";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import { getPosts, getTags } from "@/utils/notion";
import FeaturedPosts from "@/components/Organisms/FeaturedPosts";
import FilteredPosts from "@/components/Organisms/FilteredPosts";

export default async function Home() {
    return (
        <main className="mx-auto min-h-screen top-0">
            <FeaturedPosts />
        </main>
    );
}
