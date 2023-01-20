import React from "react";
import Image from "next/image";
import Emoji from "@/components/Atoms/Emoji";
import { renderBlock } from "@/lib/helpers";
import { getBySlug, getBlocks } from "@/utils/notion";
import { getPostSlug } from "@/lib/helpers";
import SideBar from "@/components/Organisms/SideBar";
import { Suspense } from "react";
import { getPosts } from "@/utils/notion";

export default async function Page({ params: { slug } }) {
    const page = await getBySlug(slug);
    // const blocks = await getBlocks(page.id);
    return (
        <main className="layout">
            <Suspense fallback={<p>Loading...</p>}>
                <section className="flex gap-x-4 py-10 w-full ">
                    <article className="flex flex-col gap-2">
                        <h1 className="md:text-4xl text-2xl font-bold">
                            {page?.icon !== null ? (
                                <Emoji symbol={page?.icon.emoji} />
                            ) : null}
                            {page?.properties.Name.title[0].text.content}
                        </h1>

                        <div className="relative w-full h-80">
                            {page?.cover !== null ? (
                                <Image
                                    fill
                                    className="object-cover absolute"
                                    alt=""
                                    src={
                                        page?.cover.type === "external"
                                            ? page?.cover.external.url
                                            : page?.cover.type === "file"
                                            ? page?.cover.file.url
                                            : null
                                    }
                                />
                            ) : null}
                        </div>
                        {/* <div className="text-justify flex flex-col gap-2">
                            {blocks &&
                                blocks.map((block) => (
                                    <React.Fragment key={block.id}>
                                        {renderBlock(block)}
                                    </React.Fragment>
                                ))}
                        </div> */}
                    </article>
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
