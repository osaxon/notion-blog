import Image from "next/image";
import Link from "next/link";
import Emoji from "../components/Atoms/Emoji";
import Heading from "../components/Atoms/Heading";

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

export function renderBlock(block) {
    switch (block.type) {
        case BLOCK_TYPES.h1:
            // For a heading
            return (
                <Heading as="h1" className="mt-20 text-3xl font-bold">
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
            let fullScreen = false;
            return (
                <div
                    onClick={() => {
                        message = "goodbye";
                    }}
                    className="relative h-80 w-full overflow-hidden"
                >
                    <Image
                        alt="Cover image"
                        fill
                        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                        src={
                            block[BLOCK_TYPES.image].type === "external"
                                ? block[BLOCK_TYPES.image].external.url
                                : block[BLOCK_TYPES.image].type === "file"
                                ? block[BLOCK_TYPES.image].file.url
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

export function getTags(page) {
    return page.properties.Tags.multi_select;
}
