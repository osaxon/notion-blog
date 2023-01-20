import Emoji from "../Atoms/Emoji";
import Image from "next/image";

const PageCover = ({ page }) => {
    return (
        <div>
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
        </div>
    );
};

export default PageCover;
