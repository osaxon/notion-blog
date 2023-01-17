import { Client } from "@notionhq/client"

const notion = new Client({
    auth: process.env.NOTION_API_SECRET
})

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        return res.status(405).json({ message: `${req.method} not allowed.`})
    }

    try {
        const { id } = req.query;
        const post = await notion.pages.retrieve({
        page_id: id,
    });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}