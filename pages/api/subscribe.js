import client from "@mailchimp/mailchimp_marketing";

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;
const DATACENTER = process.env.MAILCHIMP_API_SERVER;

client.setConfig({
    apiKey: API_KEY,
    server: DATACENTER,
});

export default async function handler(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email required" });
    }
    if (req.method !== "POST") {
        return res.status(400).json({ error: `${req.method} not allowed` });
    }

    try {
        const response = await client.lists.addListMember(AUDIENCE_ID, {
            email_address: email,
            status: "subscribed",
        });
        return res.status(201).json(response);
    } catch (error) {
        error = JSON.parse(error.response.text);
        console.log(error);
        return res.status(error.status).json({ error: error });
    }
}
