import { getWeeklyRoundup } from "../../../utils/notion";
import { format } from "date-fns";
import {
    getPostExcerpt,
    getPostTitle,
    getPostCoverImage,
    getPostSlug,
} from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json(`${req.method} not allowed.`);
    }
    const { api_key } = req.query;

    if (api_key !== process.env.MY_API_KEY) {
        return res.status(401).json({ message: "Not authorised." });
    } else {
        try {
            let { posts } = await getWeeklyRoundup({ limit: 5 });
            posts = posts.map((post) => {
                return {
                    title: getPostTitle(post),
                    excerpt: getPostExcerpt(post),
                    coverImage: getPostCoverImage(post),
                    slug: getPostSlug(post),
                    created: format(new Date(post.created_time), "dd-MMM-yyyy"),
                };
            });
            return res.status(200).json(posts);
        } catch (error) {
            // err
            res.status(500).json({
                message: "There was an error retrieving posts",
            });
        }
    }
}
