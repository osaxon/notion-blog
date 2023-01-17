import { Client } from "@notionhq/client"

const notion = new Client({
    auth: process.env.NOTION_API_SECRET
})

export default async function handler(req, res) {
    console.log(req.body)
    if(req.method !== 'POST') {
        return res.status(405).json({ message: `${req.method} not allowed.`})
    }

    try {
        const { currentLikes, postId } = JSON.parse(req.body);
        await notion.pages.update({
            page_id: postId,
            properties: {
                Likes: {
                    number: currentLikes + 1
                }
             }
        })
        res.status(201).json({ msg: 'Success' });
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}