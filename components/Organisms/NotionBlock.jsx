import React from "react";
import Emoji from "../Atoms/Emoji";
import Image from "next/image";
import Link from "next/link";
import Heading from "../Atoms/Heading";
import clsx from "clsx";

const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);

const NOTION_BG_COLOUR = {
    blue_background: "bg-info bg-opacity text-blue-50",
    orange_background: "bg-orange-400 text-orange-50",
    green_background: "bg-success text-green-50",
    red_background: "bg-warning text-red-50",
    purple_background: "bg-purple-400 text-purple-50",
    yellow_background: "bg-yellow-400 text-yellow-50",
    gray_background: "bg-gray-400 text-gray-50",
};

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

const RichText = ({ rich_text, as: Element }) => {
    if (rich_text.length < 1) return null;
    const annotationTypes = {
        bold: "font-bold",
        underline: "underline",
        strikethrough: "line-through",
        italic: "italic",
    };
    return (
        <Element>
            {rich_text.map((el, i) => {
                const annotation = Object.keys(el.annotations).filter(
                    (key) => el.annotations[key] === true
                );
                const isLink = el.href;
                if (annotation.length > 0)
                    return (
                        <span
                            key={i}
                            className={clsx(annotationTypes[annotation])}
                        >
                            {el.text.content}
                        </span>
                    );

                if (isLink)
                    return (
                        <Link className="link" href={el.href}>
                            {el.text.content}
                        </Link>
                    );

                return el.text.content;
            })}
        </Element>
    );
};

const NotionBlock = async ({ block }) => {
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
                <Heading as="h2" className="py-4 text-3xl font-bold">
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
                <figure className="relative mx-auto flex h-auto max-w-[600px] flex-col py-8">
                    <Image
                        src={imgUrl}
                        width={600}
                        height={600}
                        alt={imgCaption ? imgCaption : "Image has no caption"}
                        priority
                        className="object-cover"
                        placeholder="empty"
                    />
                    {imgCaption ? (
                        <span className="max-w-[600px] italic">
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
            return (
                <RichText
                    as="p"
                    rich_text={block[BLOCK_TYPES.paragraph].rich_text}
                />
            );

        case BLOCK_TYPES.callout:
            const richText = block[BLOCK_TYPES.callout].rich_text;
            const itemCount = richText.length;
            const emoji = block[BLOCK_TYPES.callout].icon.emoji || null;

            return (
                <span
                    className={clsx(
                        "mt-8 mb-4 flex items-center gap-2 p-2 text-xl",
                        NOTION_BG_COLOUR[block[BLOCK_TYPES.callout].color]
                    )}
                >
                    {emoji && <Emoji className="text-xl" symbol={emoji} />}
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
