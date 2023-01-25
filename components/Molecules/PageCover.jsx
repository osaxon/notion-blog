"use client";
import Emoji from "../Atoms/Emoji";
import { useState } from "react";
import Image from "next/image";
import ReadTime from "./ReadTime";
import { format } from "date-fns";

function FormattedTime({ dt }) {
    const time = format(new Date(dt), "dd-MMM-yyyy");
    return <span className="font-mono italic text-base-content">{time}</span>;
}

const PageCover = ({ page }) => {
    const [imageDetails, setImageDetails] = useState();
    let imgUrl;

    if (page.cover) {
        imgUrl =
            page?.cover.type === "external"
                ? page?.cover.external.url
                : page?.cover.type === "file"
                ? page?.cover.file.url
                : null;
    }

    return (
        <>
            {page && page?.cover !== null ? (
                <Image
                    alt="Cover image"
                    width={800}
                    height={
                        imageDetails?.height ? 500 / imageDetails.height : 500
                    }
                    className="w-full h-[33vh] object-cover"
                    onLoadingComplete={(e) => {
                        setImageDetails({
                            url: imgUrl,
                            width: e.naturalWidth,
                            height: e.naturalHeight,
                            ratio: e.naturalWidth / e.naturalHeight,
                        });
                    }}
                    src={imgUrl}
                />
            ) : null}
            <div className="flex relative items-center justify-center flex-col gap-2 py-8">
                {page?.icon !== null ? (
                    <Emoji
                        className="absolute -top-12 text-[4rem]"
                        symbol={page?.icon.emoji}
                    />
                ) : null}
                <h1 className="md:text-4xl text-2xl font-bold">
                    {page?.properties.Name.title[0].text.content}
                </h1>
                <div className="flex gap-2 items-center">
                    <FormattedTime dt={page.properties.Created.created_time} />
                    <ReadTime />
                </div>
            </div>
        </>
    );
};

export default PageCover;
