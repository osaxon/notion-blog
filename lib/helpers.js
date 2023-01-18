import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Atoms/Heading";

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
                <Heading as="h2" className="text-2xl font-bold mt-6 mb-4">
                    {block["heading_2"].rich_text[0].plain_text}
                </Heading>
            );
        case "heading_3":
            return (
                <Heading as="h3" className="text-xl font-bold py-2 mt-6 mb-4">
                    {block["heading_3"].rich_text[0].plain_text}
                </Heading>
            );
        case "heading_4":
            return (
                <Heading as="h4" className="text-lg font-bold mt-6 mb-4">
                    {block["heading_4"].rich_text[0].plain_text}
                </Heading>
            );
        case "image":
            // For an image
            return (
                <Image
                    alt="Cover image"
                    src={
                        block["image"].type === "external"
                            ? block["image"].external.url
                            : block["image"].type === "file"
                            ? block["image"].file.url
                            : null
                    }
                    width={650}
                    height={400}
                />
            );
        case "bulleted_list_item":
            // For an unordered list
            return (
                <ul>
                    <li>
                        {block["bulleted_list_item"].rich_text[0]?.plain_text}{" "}
                    </li>
                </ul>
            );
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
