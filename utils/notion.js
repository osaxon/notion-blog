import { cache } from "react";
import { client } from "@/lib/notionClient";
import uniq from "lodash/uniq";

const POSTS_DB = process.env.POSTS_DATABASE;
const PLACES_DB = process.env.PLACES_DATABASE;

export const getPosts = cache(async (startCursor = undefined) => {
    const {
        results: posts,
        next_cursor,
        has_more,
        page,
    } = await client.databases.query({
        database_id: POSTS_DB,
        start_cursor: startCursor,
    });
    return { posts, next_cursor, has_more, page };
});

export const getPlaces = cache(async (startCursor = undefined) => {
    const {
        results: places,
        next_cursor,
        has_more,
        page,
    } = await client.databases.query({
        database_id: PLACES_DB,
        start_cursor: startCursor,
    });
    return { places, next_cursor, has_more, page };
});

export const getFeaturedPosts = cache(async () => {
    const { results: posts } = await client.databases.query({
        database_id: POSTS_DB,
        page_size: 10,
    });
    return { posts };
});

export const getPostsByTag = cache(async (tag) => {
    const { results: posts } = await client.databases.query({
        database_id: POSTS_DB,
        filter: {
            property: "Tags",
            multi_select: {
                contains: tag,
            },
        },
    });
    return { posts };
});

export const getSinglePost = cache(async (id) => {
    let post;
    try {
        post = await client.pages.retrieve({
            page_id: id,
        });
    } catch (error) {
        console.log(error);
        return error;
    }
    return post;
});

export const getBySlug = cache(async (slug) => {
    const { results: pages } = await client.databases.query({
        database_id: POSTS_DB,
        filter: {
            property: "Slug",
            formula: {
                string: {
                    equals: slug,
                },
            },
        },
    });
    return pages[0];
});

export const getBlocks = cache(async (id) => {
    const { results: blocks } = await client.blocks.children.list({
        block_id: id,
    });
    return blocks;
});

export const getPageAndBlocks = cache(async (slug) => {
    const page = await getBySlug(slug);
    const blocks = await getBlocks(page.id);
    return { page, blocks };
});

export const getTags = (posts) => {
    const tags = [];
    posts.forEach(({ properties }) =>
        properties.Tags.multi_select.forEach(({ name }) => tags.push(name))
    );
    return uniq(tags);
};
