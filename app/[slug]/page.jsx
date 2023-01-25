import React from "react";
import { Suspense } from "react";
import { PageCover, BlockContent } from "@/components/Molecules";
import { getPageAndBlocks, getPosts } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";
import SideBar from "@/components/Organisms/SideBar";
import NotionBlock from "@/components/Organisms/NotionBlock";

export default async function Page({ params: { slug } }) {
    const _blocks = getPageAndBlocks(slug);

    const { page, blocks } = await _blocks;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main>
                <PageCover page={page} />
                <article className="layout flex flex-col md:flex-row">
                    <section>
                        {blocks.map((block) => (
                            <React.Fragment key={block.id}>
                                <NotionBlock block={block} />
                            </React.Fragment>
                        ))}
                    </section>

                    <aside className="basis-40">
                        <SideBar />
                    </aside>
                </article>
            </main>
        </Suspense>
    );
}

export async function generateStaticParams() {
    const { posts } = await getPosts();
    return posts.map((post) => ({ slug: getPostSlug(post) }));
}

export const revalidate = 60;
