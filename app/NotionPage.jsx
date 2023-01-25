"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import clsx from "clsx";
import SideBar from "@/components/Organisms/SideBar";
const Collection = dynamic(() =>
    import("react-notion-x/build/third-party/collection").then(
        (m) => m.Collection
    )
);

const NotionPage = ({ recordMap, rootPageId }) => {
    return (
        <>
            <NotionRenderer
                fullPage={false}
                pageAside={<SideBar />}
                showTableOfContents={true}
                bodyClassName={clsx("px-0 layout border")}
                recordMap={recordMap}
                rootPageId={rootPageId}
                components={{
                    nextImage: Image,
                    nextLink: Link,
                }}
            />
        </>
    );
};

export default NotionPage;
