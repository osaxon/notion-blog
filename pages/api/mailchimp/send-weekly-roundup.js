import client from "@mailchimp/mailchimp_marketing";
import txclient from "@mailchimp/mailchimp_transactional";

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;
const DATACENTER = process.env.MAILCHIMP_API_SERVER;

client.setConfig({
    apiKey: API_KEY,
    server: DATACENTER,
});

export default async function handler(req, res) {
    // const response = await client.campaigns.create({
    //     type: "plaintext",
    //     recipients: { list_id: AUDIENCE_ID },
    //     settings: {
    //         subject_line: "Weekly WebJenga Travel roundup",
    //         title: "Weekly roundup - title",
    //         from_name: "Oli",
    //         reply_to: "webjenga@outlook.com",
    //         template_id: "13682947",
    //     },
    // });
}
