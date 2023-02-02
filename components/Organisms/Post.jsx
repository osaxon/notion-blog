import { PageCover, BlockContent } from "../Molecules";
import { getBySlug, getBlocks } from "../../utils/notion";

export default async function Post({ slug }) {
    const page = await getBySlug(slug);
    const blocks = await getBlocks(page.id);

    return (
        <article className="flex flex-col gap-2 w-full">
            <PageCover page={page} />
            <BlockContent blocks={blocks} />
        </article>
    );
}
