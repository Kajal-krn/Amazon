const nodeMailer = require("nodemailer");

const SendEmail = async(options) => {

    const Transporter = nodeMailer.createTransport({
        host : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        service : process.env.SMPT_SERVICE,
        secure: true,
        auth : {
            user : process.env.SMPT_EMAIL,
            pass : process.env.SMPT_PASSWORD
        }
    });

    const MailOptions = {
        from : process.env.SMPT_EMAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    };

    await Transporter.sendMail(MailOptions);

};

module.exports = SendEmail;