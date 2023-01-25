import React from "react";
import { PageCover, BlockContent } from "@/components/Molecules";
import { getBySlug, getPageAndBlocks, getPosts } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";
import NotionBlock from "@/components/Organisms/NotionBlock";
import { getBlogPost } from "@/lib/notionAPI";
import NotionPage from "../NotionPage";

export default async function Page({ params: { slug } }) {
    const post = await getBySlug(slug);

    const blogPost = await getBlogPost(post.id);
    return <NotionPage recordMap={blogPost} />;
}

export async function generateStaticParams() {
    const { posts } = await getPosts();
    return posts.map((post) => ({ slug: getPostSlug(post) }));
}

export const revalidate = 60;
