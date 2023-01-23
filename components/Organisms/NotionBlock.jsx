"use client";
import React, { useState } from "react";
import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import Link from "next/link";
import Heading from "../Atoms/Heading";

const BLOCK_TYPES = {
    h1: "heading_1",
    h2: "heading_2",
    h3: "heading_3",
    h4: "heading_4",
    paragraph: "paragraph",
    image: "image",
    bulletedListItem: "bulleted_list_item",
    callout: "callout",
};

const NotionBlock = ({ block }) => {
    switch (block.type) {
        case BLOCK_TYPES.h1:
            // For a heading
            return (
                <Heading as="h1" className="text-3xl font-bold mt-20">
                    {block[BLOCK_TYPES.h1].rich_text[0].plain_text}
                </Heading>
            );
        case BLOCK_TYPES.h2:
            return (
                <Heading as="h2" className="text-2xl font-bold">
                    {block[BLOCK_TYPES.h2].rich_text[0].plain_text}
                </Heading>
            );
        case BLOCK_TYPES.h3:
            return (
                <Heading as="h3" className="text-xl font-bold">
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
            return (
                <Image
                    alt="Cover image"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                    src={
                        block[BLOCK_TYPES.image].type === "external"
                            ? block[BLOCK_TYPES.image].external.url
                            : block[BLOCK_TYPES.image].type === "file"
                            ? block[BLOCK_TYPES.image].file.url
                            : null
                    }
                />
            );
        case "bulleted_list_item":
            // For an unordered list
            return (
                <li>
                    {
                        block[BLOCK_TYPES.bulletedListItem].rich_text[0]
                            .plain_text
                    }
                    {block[BLOCK_TYPES.bulletedListItem].rich_text.length > 0
                        ? block[BLOCK_TYPES.bulletedListItem].rich_text
                              .filter((item, i) => item.href !== null)
                              .map((item, i) => (
                                  <Link
                                      className="link link-primary"
                                      key={i}
                                      href={item.href}
                                  >
                                      {item.plain_text}
                                  </Link>
                              ))
                        : ""}
                </li>
            );

        case "column_list":
            return <div className="columns-2"></div>;
        case BLOCK_TYPES.paragraph:
            // For a paragraph
            return (
                <p>
                    {block[BLOCK_TYPES.paragraph].rich_text[0]?.text?.content}{" "}
                </p>
            );
        case BLOCK_TYPES.callout:
            const richText = block[BLOCK_TYPES.callout].rich_text;
            const itemCount = richText.length;
            const emoji = block[BLOCK_TYPES.callout].icon.emoji || null;
            return (
                <span className="bg-primary text-primary-content p-4 inline-flex gap-2">
                    {emoji && <Emoji symbol={emoji} />}
                    {richText.map((item, index) => {
                        if (item.href !== null) {
                            return (
                                <Link
                                    className="hover:italic link"
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