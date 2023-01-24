import React from "react";
import { PageCover, BlockContent } from "@/components/Molecules";
import SideBar from "@/components/Organisms/SideBar";
import { getPageAndBlocks, getPosts } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";
import NotionBlock from "@/components/Organisms/NotionBlock";

export default async function Page({ params: { slug } }) {
    const { page, blocks } = await getPageAndBlocks(slug);
    return (
        <main className="flex flex-col gap-y-10 w-full">
            <PageCover page={page} />
            <article className="flex layout justify-between flex-col md:flex-row gap-2">
                <section className="text-justify w-full flex flex-col gap-2">
                    {blocks &&
                        blocks.map((block) => {
                            if (
                                block.has_children &&
                                block.type === "column_list"
                            ) {
                                return (
                                    <div
                                        key={block.id}
                                        className="md:columns-2"
                                    >
                                        {block.children.map((child) => (
                                            <React.Fragment key={child.id}>
                                                <NotionBlock block={child} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                );
                            }
                            return (
                                <React.Fragment key={block.id}>
                                    <NotionBlock block={block} />
                                </React.Fragment>
                            );
                        })}
                </section>
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
