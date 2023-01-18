import React from "react";
import LikeButton from "./LikeButton";
import Image from "next/image";
import Emoji from "@/components/Atoms/Emoji";
import { renderBlock } from "@/lib/helpers";
import { getBySlug, getBlocks } from "@/utils/notion";
import TableOfContents from "@/components/Organisms/TableOfContents";

export default async function Page({ params: { slug } }) {
    const page = await getBySlug(slug);
    const blocks = await getBlocks(page.id);
    return (
        <main className="layout">
            <section className="flex gap-x-6 py-10">
                <article className="">
                    <h1 className="md:text-4xl text-2xl font-bold py-2">
                        {page.icon !== null ? (
                            <Emoji symbol={page.icon.emoji} />
                        ) : null}
                        {page.properties.Name.title[0].text.content}
                    </h1>
                    <div className="flex pb-2">
                        <LikeButton slug={slug} />
                    </div>
                    <div className="relative w-full h-80">
                        {page.cover !== null ? (
                            <Image
                                fill
                                className="object-cover absolute"
                                alt=""
                                src={
                                    page.cover.type === "external"
                                        ? page.cover.external.url
                                        : page.cover.type === "file"
                                        ? page.cover.file.url
                                        : null
                                }
                            />
                        ) : null}
                    </div>
                    {blocks &&
                        blocks.map((block) => (
                            <React.Fragment key={block.id}>
                                {renderBlock(block)}
                            </React.Fragment>
                        ))}
                </article>
                <aside className="py-4">
                    <div className="sticky top-10">
                        <TableOfContents />
                    </div>
                </aside>
            </section>
        </main>
    );
}

export const revalidate = 60;
