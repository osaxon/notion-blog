import React, { Suspense } from "react";

import PostSkeleton from "@/components/Organisms/PostSkeleton";
import { Post } from "@/components/Organisms";
import SideBar from "@/components/Organisms/SideBar";

import { getPosts } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";

export default async function Page({ params: { slug } }) {
    return (
        <main className="layout">
            <Suspense fallback={<PostSkeleton />}>
                <section className="flex gap-x-4 py-10 w-full ">
                    <Post slug={slug} />
                    <SideBar />
                </section>
            </Suspense>
        </main>
    );
}

export async function generateStaticParams() {
    const { posts } = await getPosts();
    return posts.map((post) => ({ slug: getPostSlug(post) }));
}

export const revalidate = 60;
