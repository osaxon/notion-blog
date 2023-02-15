import client from "@mailchimp/mailchimp_marketing";
import apiClient from "../../lib/axios";

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;
const DATACENTER = process.env.MAILCHIMP_API_SERVER;

client.setConfig({
    apiKey: API_KEY,
    server: DATACENTER,
});

export default async function handler(req, res) {
    const { email } = req.body;
    console.log(email);

    if (!email) {
        return res.status(400).json({ error: "Email required" });
    }
    if (req.method !== "POST") {
        return res.status(400).json({ error: `${req.method} not allowed` });
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
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.response.data);
    }

    // try {
    //     const response = await client.lists.addListMember(AUDIENCE_ID, {
    //         email_address: email,
    //         status: "subscribed",
    //     });
    //     return res.status(201).json(response);
    // } catch (error) {
    //     error = JSON.parse(error.response.text);
    //     console.error(error);
    //     return res.status(error.status).json({ error: error });
    // }
}
