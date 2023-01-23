import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Atoms/Heading";
import { divide } from "lodash";

export function renderBlock(block) {
    switch (block.type) {
        case "heading_1":
            // For a heading
            return (
                <Heading as="h1" className="text-3xl font-bold mt-20">
                    {block["heading_1"].rich_text[0].plain_text}
                </Heading>
            );
        case "heading_2":
            return (
                <Heading as="h2" className="text-2xl font-bold">
                    {block["heading_2"].rich_text[0].plain_text}
                </Heading>
            );
        case "heading_3":
            return (
                <Heading as="h3" className="text-xl font-bold">
                    {block["heading_3"].rich_text[0].plain_text}
                </Heading>
            );
        case "heading_4":
            return (
                <Heading as="h4" className="text-lg font-bold">
                    {block["heading_4"].rich_text[0].plain_text}
                </Heading>
            );
        case "image":
            // For an image
            return (
                <div className="relative w-full h-80 overflow-hidden">
                    <Image
                        alt="Cover image"
                        fill
                        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                        src={
                            block["image"].type === "external"
                                ? block["image"].external.url
                                : block["image"].type === "file"
                                ? block["image"].file.url
                                : null
                        }
                        className="absolute object-cover object-left-top"
                    />
                </div>
            );
        case "bulleted_list_item":
            // For an unordered list
            return (
                <li>
                    {block["bulleted_list_item"].rich_text[0].plain_text}
                    {block["bulleted_list_item"].rich_text.length > 0
                        ? block["bulleted_list_item"].rich_text
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
        case "paragraph":
            // For a paragraph
            return <p>{block["paragraph"].rich_text[0]?.text?.content} </p>;
        default:
            // For an extra type
            return <p>Undefined type </p>;
    }
}

export function getHeadings(blocks) {
    const headings = [
        {
            level: "",
            id: "",
            text: "",
        },
    ];

    return blocks
        .filter((block) => block.type === "heading_2")
        .map((heading) => heading.heading_2.rich_text[0].plain_text);
}

export function getPostCoverImage(post) {
    if (post.cover == null) return "/placeholder.jpg";
    switch (post.cover.type) {
        case "external":
            return post.cover.external.url;
        case "file":
            return post.cover.file.url;
        default:
            return "/placeholder.jpg";
    }
}

export function getPostTitle(post) {
    return post.properties.Name.title[0].plain_text;
}

export function getPostExcerpt(post) {
    return post.properties.Excerpt.rich_text[0].text.content;
}

export function getPostSlug(post) {
    return post.properties.Slug.formula.string;
}
