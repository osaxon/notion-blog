"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import SideBar from "@/components/Organisms/SideBar";
import clsx from "clsx";
const Collection = dynamic(() =>
    import("react-notion-x/build/third-party/collection").then(
        (m) => m.Collection
    )
);

const NotionPage = ({ recordMap, rootPageId }) => {
    return (
        <NotionRenderer
            fullPage={true}
            bodyClassName={clsx("px-0 layout border")}
            showTableOfContents={true}
            pageAside={<SideBar />}
            recordMap={recordMap}
            rootPageId={rootPageId}
            components={{
                nextImage: Image,
                nextLink: Link,
                Collection,
            }}
        />
    );
};

export default NotionPage;
