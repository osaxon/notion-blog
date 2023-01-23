import React from "react";
import NotionBlock from "../Organisms/NotionBlock";

const BlockContent = ({ blocks }) => {
    return (
        <section className="text-justify w-full flex flex-col gap-2">
            {blocks &&
                blocks.map((block) => (
                    <React.Fragment key={block.id}>
                        <NotionBlock block={block} />
                    </React.Fragment>
                ))}
        </section>
    );
};

export default BlockContent;
