const nodemailer = require("nodemailer");
const { EmailServiceError } = require("./errorService");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendEmail = async (to, subject, html, text, replyTo) => {
  const mailOptions = {
    from: '"Eclat de beauté" <contact@xn--clatdebeaut-99al.fr>',
    to,
    subject,
    text,
    html,
    replyTo,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email");
    throw new EmailServiceError("Erreur lors de l'envoi de l'e-mail.");
  }
};
