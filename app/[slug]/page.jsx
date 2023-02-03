import React from "react";
import { Suspense } from "react";
import { PageCover } from "../../components/Molecules";
import { getPageAndBlocks, getPosts } from "../../utils/notion";
import { getPostSlug } from "../../lib/helpers";
import SideBar from "../../components/Organisms/SideBar";
import ZoomedImage from "../../components/Molecules/ZoomedImage";
import NotionBlock from "../../components/Organisms/NotionBlock";

export default async function Page({ params: { slug } }) {
    const _blocks = getPageAndBlocks(slug);
    const { page, blocks } = await _blocks;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="relative">
                <PageCover page={page} />
                <ZoomedImage />
                <article className="layout bg-white gap-x-px flex flex-col md:flex-row">
                    <section className="px-4 flex-grow">
                        {blocks.map((block) => (
                            <React.Fragment key={block.id}>
                                <NotionBlock block={block} />
                            </React.Fragment>
                        ))}
                    </section>

                    <aside className="flex-grow md:max-w-[250px] w-full px-4">
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
