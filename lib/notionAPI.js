// Place this file anywhere in your next project.
import { NotionAPI } from "notion-client";

const api = new NotionAPI({
    // This token is your user token.
    // This is only necessary if you wish to keep your blog database private
    // It is not needed if your database is public.
    // See https://www.notion.so/Find-Your-Notion-Token-5da17a8df27a4fb290e9e3b5d9ba89c4
    // for how to find your user token.
    authToken: process.env.NOTION_TOKEN,
});

export async function getBlogPost(postId) {
    const post = await api.getPage(postId);
    return post;
}

export async function getAllPosts() {
    const posts = await api.getPage("159f9a748f1f43b2a8a09d6f6480121a");
    return posts;
}
