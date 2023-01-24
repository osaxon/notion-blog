import React from "react";
import { PageCover, BlockContent } from "@/components/Molecules";
import SideBar from "@/components/Organisms/SideBar";
import { getPageAndBlocks, getPosts } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";

export default async function Page({ params: { slug } }) {
    const { page, blocks } = await getPageAndBlocks(slug);
    console.log(blocks);

    return (
        <main className="flex flex-col gap-y-10 w-full">
            <PageCover page={page} />
            <article className="flex layout justify-between flex-col md:flex-row gap-2">
                <BlockContent blocks={blocks} />
                <SideBar />
            </article>
        </main>
    );
}

export async function generateStaticParams() {
    const { posts } = await getPosts();
    return posts.map((post) => ({ slug: getPostSlug(post) }));
}

export const revalidate = 60;
