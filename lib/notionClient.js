import { Client, APIErrorCode } from '@notionhq/client';

const client = new Client({
   auth: process.env.NOTION_API_SECRET,
});

export { client, APIErrorCode }