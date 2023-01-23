import React, { Suspense } from "react";
import PostSkeleton from "@/components/Organisms/PostSkeleton";
import { PageCover, BlockContent } from "@/components/Molecules";
import SideBar from "@/components/Organisms/SideBar";
import PostFooter from "@/components/Organisms/PostFooter";
import { getPosts, getBlocks, getBySlug } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";
import ReadTime from "@/components/Molecules/ReadTime";

export default async function Page({ params: { slug } }) {
    const page = await getBySlug(slug);
    const blocks = await getBlocks(page.id);

    return (
        <main>
            <Suspense fallback={<PostSkeleton />}>
                <section className="flex flex-col gap-y-10 w-full">
                    <PageCover page={page} />
                    <article className="flex layout border justify-between flex-col md:flex-row gap-2">
                        <BlockContent blocks={blocks} />
                        <SideBar />
                    </article>
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
