import apiClient from "../../lib/axios";

export default async function handler(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(405).json({ error: "Email required" });
    }
    if (req.method !== "POST") {
        return res.status(405).json({ error: `${req.method} not allowed` });
    }

    try {
        const response = await apiClient.post(
            `https://emailoctopus.com/api/1.6/lists/${process.env.EMAIL_OCTOPUS_LIST_ID}/contacts`,
            {
                api_key: process.env.EMAIL_OCTOPUS_API_KEY,
                email_address: email,
                status: "SUBSCRIBED",
            }
        );
        if (response.data) {
            return res.status(200).json(response.data);
        }
    } catch (error) {
        if (error.response) {
            return res
                .status(error.response.status || 500)
                .json(error.response.data.error);
        } else if (error.request) {
            console.error(error.request);
            return res.status(500).json(error);
        } else {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}
