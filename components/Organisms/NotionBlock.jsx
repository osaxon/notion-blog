import React from "react";
import { renderBlock } from "@/lib/helpers";

const NotionBlock = ({ block }) => {
    const rendered = renderBlock(block);
    return <>{rendered}</>;
};

export default NotionBlock;
