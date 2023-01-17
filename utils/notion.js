import { cache } from "react";
import { client } from "@/lib/notionClient";
import uniq from 'lodash/uniq';

const DB = process.env.NOTION_DATABASE

export const getPosts = cache(async (startCursor = undefined) => {
  const {
    results: posts,
    next_cursor,
    has_more,
    page,
  } = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
    start_cursor: startCursor,
  });
  return { posts, next_cursor, has_more, page };
});

export const getFeaturedPosts = cache(async () => {
  const { results: posts } = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
    page_size: 10,
  });
  return { posts };
});

export const getPostsByTag = cache(async (tag) => {
  console.log(tag)
  const { results: posts } = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
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

export const getBySlug = async (slug) => {
    const { results: posts } = await client.databases.query({
      database_id: DB,
      filter: {
        property: "Slug",
        formula: {
          string: {
            equals: slug
          }
        }
      }
    })
    return posts[0]
}

export const getBlocks = cache(async (id) => {
  const { results: blocks } = await client.blocks.children.list({
    block_id: id,
  });
  return blocks;
});

export const likePage = async (currentLikes, id) => {
  const response = await client.pages.update({
    page_id: id,
    properties: {
      Likes: {
        Number: currentLikes + 1
      }
    }
  })
  console.log(response)
}

export const getTags = (posts) => {
  const tags = [];
  posts.forEach(({properties}) => properties.Tags.multi_select.forEach(({name}) => tags.push(name)))
  return uniq(tags)
}