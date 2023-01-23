import React from "react";
import NotionBlock from "../Organisms/NotionBlock";

const BlockContent = ({ blocks }) => {
    return (
        <div className="text-justify w-full flex flex-col gap-2 border">
            {blocks &&
                blocks.map((block) => (
                    <React.Fragment key={block.id}>
                        <NotionBlock block={block} />
                    </React.Fragment>
                ))}
        </div>
    );
};

export default BlockContent;
