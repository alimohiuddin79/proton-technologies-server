import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // secure port
    secure: true,
    auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
    }
});

const smtpResponse = async (req, res) => {
    try {
        const textBody = `FROM: ${req.body.name} EMAIL: ${req.body.email} MESSAGE: ${req.body.message} COMMENT: ${req.body.comment}`;
        const htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${req.body.name} <a href="mailto:${req.body.email}">${req.body.email}</a></p><p>${req.body.message}</p><p>${req.body.comment}</p>`;

        let mail = {
            from: req.body.email, // sender address
            to: process.env.CONTACT_EMAIL,
            subject: "Mail From Contact Form",
            text: textBody,
            html: htmlBody,
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(mail);

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export { smtpResponse };


// , function (err, info) {
//     if(err) {
//         console.log(err);
//         res.json({ message: "message not sent: an error ocurred" });
//     }
//     else {
//         console.log(info.messageId);
//         res.status(200).json({ message: "Your mail successfully sent" });
//     }
// }