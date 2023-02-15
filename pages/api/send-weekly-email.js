import sendgrid from "@sendgrid/mail";
import apiClient from "../../lib/axios";

async function sendEmail(req, res) {
    try {
        const contacts = await apiClient.get(
            `https://emailoctopus.com/api/1.6/lists/${process.env.EMAIL_OCTOPUS_LIST_ID}/contacts`,
            {
                api_key: "6130733f-8b8e-4482-b786-6971bfbe335c",
                limit: 200,
            }
        );
        res.status(200).json(contacts);
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
        // console.log(error);
        return res
            .status(error.statusCode || 500)
            .json({ error: error.response.data.error });
    }

    return res.status(200).json({ error: "" });
}

export default sendEmail;
