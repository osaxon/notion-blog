import sendgrid from "@sendgrid/mail";
import apiClient from "../../lib/axios";

export default async function handler(req, res) {
    try {
        const { data } = await apiClient.get(
            `https://emailoctopus.com/api/1.6/lists/${process.env.EMAIL_OCTOPUS_LIST_ID}/contacts/subscribed`,
            {
                params: {
                    api_key: process.env.EMAIL_OCTOPUS_API_KEY,
                    limit: 50,
                    page: 1,
                },
            }
        );
        res.status(200).json(data);
        //     await sendgrid.send({
        //         to: "oliverrsaxon@gmail.com", // Your email where you'll receive emails
        //         from: "oliverrsaxon@gmail.com", // your website email address here
        //         subject: `[Lead from website] : ${req.body.name}`,
        //         html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        //   <html lang="en">
        //   <head>
        //     <meta charset="utf-8">
        //     <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        //     <link rel="stylesheet" href="css/styles.css?v=1.0">
        //   </head>

        //   <body>
        //     <div class="container" style="margin-left: 20px;margin-right: 20px;">
        //       <h3>You've got a new mail from ${req.body.name}, their email is: ✉️${req.body.email}
        //       </h3>
        //       <div style="font-size: 16px;">
        //       <p>Message:</p>
        //       <p>${req.body.message}</p>
        //       <br>
        //     </div>
        //   </body>
        //   </html>`,
        //     });
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
