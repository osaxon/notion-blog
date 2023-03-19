"use client";
import React from "react";
import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import Link from "next/link";
import Heading from "../Atoms/Heading";
import clsx from "clsx";

const BLOCK_TYPES = {
    h1: "heading_1",
    h2: "heading_2",
    h3: "heading_3",
    h4: "heading_4",
    paragraph: "paragraph",
    image: "image",
    bulletedListItem: "bulleted_list_item",
    callout: "callout",
    columnList: "column_list",
    column: "column",
};

const NotionBlock = ({ block }) => {
    switch (block.type) {
        case BLOCK_TYPES.h1:
            // For a heading
            return (
                <Heading as="h1" className="mt-20 text-4xl font-bold">
                    {block[BLOCK_TYPES.h1].rich_text[0].plain_text}
                </Heading>
            );
        case BLOCK_TYPES.h2:
            return (
                <Heading
                    as="h2"
                    className="py-4 text-center text-3xl font-bold"
                >
                    {block[BLOCK_TYPES.h2].rich_text[0].plain_text}
                </Heading>
            );
        case BLOCK_TYPES.h3:
            return (
                <Heading as="h3" className="pt-3 text-center text-xl font-bold">
                    {block[BLOCK_TYPES.h3].rich_text[0].plain_text}
                </Heading>
            );
        case BLOCK_TYPES.h4:
            return (
                <Heading as="h4" className="text-lg font-bold">
                    {block[BLOCK_TYPES.h4].rich_text[0].plain_text}
                </Heading>
            );
        case BLOCK_TYPES.image:
            // For an image
            const imgUrl =
                block[BLOCK_TYPES.image].type === "external"
                    ? block[BLOCK_TYPES.image].external.url
                    : block[BLOCK_TYPES.image].type === "file"
                    ? block[BLOCK_TYPES.image].file.url
                    : null;
            const imgCaption = block[BLOCK_TYPES.image].caption;
            return (
                <figure className="relative flex h-auto w-full flex-col items-center justify-center py-8">
                    <Image
                        src={imgUrl}
                        width={600}
                        height={600}
                        alt=""
                        priority
                        className="object-cover"
                    />
                    {imgCaption ? (
                        <span className="w-full italic">
                            {imgCaption[0]?.text.content}
                        </span>
                    ) : null}
                </figure>
            );
        case "bulleted_list_item":
            // For an unordered list
            return (
                <li className="text-xl">
                    {
                        block[BLOCK_TYPES.bulletedListItem].rich_text[0]
                            .plain_text
                    }
                    {block[BLOCK_TYPES.bulletedListItem].rich_text.length > 0
                        ? block[BLOCK_TYPES.bulletedListItem].rich_text
                              .filter((item, i) => item.href !== null)
                              .map((item, i) => (
                                  <Link
                                      className="link-primary link"
                                      key={i}
                                      href={item.href}
                                  >
                                      {item.plain_text}
                                  </Link>
                              ))
                        : ""}
                </li>
            );

        case BLOCK_TYPES.columnList:
            return;
        case BLOCK_TYPES.column:
            return;
        case BLOCK_TYPES.paragraph:
            // For a paragraph
            return (
                // <p className="text-xl">
                //     {block[BLOCK_TYPES.paragraph].rich_text[0]?.text?.content}{" "}
                // </p>
                <p>
                    {block[BLOCK_TYPES.paragraph].rich_text.map((p) => {
                        if (p.annotations.bold)
                            return (
                                <span className="font-bold">
                                    {p.text.content}
                                </span>
                            );
                        if (p.href)
                            return (
                                <Link className="link" href={p.href}>
                                    {p.text.content}
                                </Link>
                            );
                        return p.text.content;
                    })}
                </p>
            );
        case BLOCK_TYPES.callout:
            const richText = block[BLOCK_TYPES.callout].rich_text;
            const itemCount = richText.length;
            const emoji = block[BLOCK_TYPES.callout].icon.emoji || null;
            return (
                <span className="inline-flex gap-2 bg-primary p-4 text-primary-content">
                    {emoji && <Emoji symbol={emoji} />}
                    {richText.map((item, index) => {
                        if (item.href !== null) {
                            return (
                                <Link
                                    className="link hover:italic"
                                    key={index}
                                    href={item.href}
                                >
                                    {item.plain_text}
                                </Link>
                            );
                        }
                        return (
                            <p className="p-3" key={index}>
                                {item.plain_text}
                            </p>
                        );
                    })}
                </span>
            );

        default:
            // For an extra type
            return <p>Undefined type: {block.type}</p>;
    }
};

export default NotionBlock;
