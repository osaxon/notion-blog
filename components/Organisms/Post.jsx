import { PageCover, BlockContent } from "../Molecules";
import { getBySlug, getBlocks, getPosts } from "@/utils/notion";
import ReadTime from "../Molecules/ReadTime";

export default async function Post({ slug }) {
    const page = await getBySlug(slug);
    const blocks = await getBlocks(page.id);

    return (
        <article className="flex flex-col gap-2">
            <PageCover page={page} />
            <BlockContent blocks={blocks} />
        </article>
    );
}
