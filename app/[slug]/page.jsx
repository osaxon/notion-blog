import React from "react";
import { Suspense } from "react";
import ScrollProgress from "../../components/Atoms/ScrollProgress";
import { ScreenSizes } from "../../components/Atoms/TailwindContainerSizes";
import { PageCover } from "../../components/Molecules";
import { getPageAndBlocks, getPosts } from "../../utils/notion";
import { getPostSlug, getTags } from "../../lib/helpers";
import SideBar from "../../components/Organisms/SideBar";
import NotionBlock from "../../components/Organisms/NotionBlock";

export default async function Page({ params: { slug } }) {
    const _blocks = getPageAndBlocks(slug);
    const { page, blocks } = await _blocks;
    const tags = getTags(page).map((t) => t.name);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="relative">
                <ScrollProgress />

                <PageCover page={page} />

                <article className="layout relative flex flex-col justify-between gap-4 md:flex-row">
                    <section className="max-w-5xl p-2">
                        {blocks.map((block) => (
                            <React.Fragment key={block.id}>
                                <NotionBlock block={block} />
                            </React.Fragment>
                        ))}
                    </section>

                    <SideBar tags={tags} />
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
