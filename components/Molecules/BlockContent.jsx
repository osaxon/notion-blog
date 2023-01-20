import { renderBlock } from "@/lib/helpers";

const BlockContent = ({ blocks }) => {
    return (
        <div className="text-justify flex flex-col gap-2">
            {blocks &&
                blocks.map((block) => (
                    <div key={block.id}>{renderBlock(block)}</div>
                ))}
        </div>
    );
};

export default BlockContent;
