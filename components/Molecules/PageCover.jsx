import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import ReadTime from "./ReadTime";
import { format } from "date-fns";
import { getTags } from "../../lib/helpers";
import TagButton from "../Atoms/TagButton";

function FormattedTime({ dt }) {
    const time = format(new Date(dt), "dd-MMM-yyyy");
    return <span className="font-mono italic text-base-content">{time}</span>;
}

export default async function PageCover({ page }) {
    let imgUrl;

    if (page.cover) {
        imgUrl =
            page?.cover.type === "external"
                ? page?.cover.external.url
                : page?.cover.type === "file"
                ? page?.cover.file.url
                : null;
    }

    const tags = getTags(page);

    return (
        <div className="-z-50">
            {page && page?.cover !== null ? (
                <Image
                    alt="Cover image"
                    width={1280}
                    height={720}
                    className="-z-[99] h-[33vh] w-full object-cover"
                    src={imgUrl}
                />
            ) : null}
            <div className="relative flex flex-col items-center justify-center gap-2 py-8">
                {page?.icon !== null ? (
                    <Emoji
                        className="absolute -top-12 text-[4rem]"
                        symbol={page?.icon.emoji}
                    />
                ) : null}
                <h1 className="text-2xl font-bold md:text-4xl">
                    {page?.properties.Name.title[0].text.content}
                </h1>
                <div className="flex items-center gap-2">
                    <FormattedTime dt={page.properties.Created.created_time} />
                    <ReadTime />
                </div>
                <ul className="flex items-center gap-2">
                    {tags &&
                        tags.map((tag) => {
                            return (
                                <li key={tag.id}>
                                    <TagButton tag={tag} />
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}
