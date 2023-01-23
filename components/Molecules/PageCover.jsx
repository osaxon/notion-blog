import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import ReadTime from "./ReadTime";
import { format } from "date-fns";

function FormattedTime({ dt }) {
    const time = format(new Date(dt), "dd-MMM-yyyy");
    return <span className="font-mono italic text-base-content">{time}</span>;
}

const PageCover = ({ page }) => {
    return (
        <section>
            <div className="relative w-full h-96">
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
            <header className="flex layout items-center justify-center flex-col gap-2 py-12">
                <h1 className="md:text-4xl text-2xl font-bold">
                    {page?.icon !== null ? (
                        <Emoji symbol={page?.icon.emoji} />
                    ) : null}
                    {page?.properties.Name.title[0].text.content}
                </h1>
                <div className="flex gap-2 items-center">
                    <FormattedTime dt={page.properties.Created.created_time} />
                    <ReadTime />
                </div>
            </header>
        </section>
    );
};

export default PageCover;
