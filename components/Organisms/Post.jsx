import { PageCover, BlockContent } from "../Molecules";
import { getBySlug, getBlocks } from "../../utils/notion";

export default async function Post({ slug }) {
    const page = await getBySlug(slug);
    const blocks = await getBlocks(page.id);
    console.log(
        blocks.filter((block) => block.type === "bulleted_list_item")[0]
            .bulleted_list_item
    );

    return (
        <article className="flex flex-col gap-2 w-full">
            <PageCover page={page} />
            <BlockContent blocks={blocks} />
        </article>
    );
}
