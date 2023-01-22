import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import ReadTime from "./ReadTime";
import { format } from "date-fns";

function formatTime(dt) {
    return format(new Date(dt), "dd-MMM-yyyy");
}

const PageCover = ({ page }) => {
    return (
        <section>
            <header className="flex flex-col gap-2 py-2">
                <h1 className="md:text-4xl text-2xl font-bold">
                    {page?.icon !== null ? (
                        <Emoji symbol={page?.icon.emoji} />
                    ) : null}
                    {page?.properties.Name.title[0].text.content}
                </h1>
                <div className="flex gap-2 items-center">
                    <p className="font-mono italic text-base-content">
                        {formatTime(page.properties.Created.created_time)},
                    </p>
                    <ReadTime />
                </div>
            </header>

            <div className="relative w-full h-80 md:h-96">
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
        </section>
    );
};

export default PageCover;
