const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cinetronewebtech@gmail.com",
    pass: process.env.OTP_EMAIL_PWD,
  },
});

/**
 * Sends an email using Nodemailer with a Gmail account.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 */
const sendEmail = async (to, subject, text) => {
  const mailData = {
    from: '"Cinetrone Authenticator" <cinetronewebtech@gmail.com>', // Sender address
    to: to, // The recipient's email address
    subject: subject, // The email subject
    text: text, // The email body
  };

  try {
    const result = await transporter.sendMail(mailData);
    console.log("Email sent successfully!", result);
    return result; 
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
};
module.exports = { sendEmail };