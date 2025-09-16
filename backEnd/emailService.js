const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: "", // Use API key from .env file
});

/**
 * Sends an email using the Mailgun API.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 */
const sendEmail = async (to, subject, text) => {
  const domain = "sandbox84e46e381ff14dc6a9c970aa1f3d1dc3.mailgun.org"; // Use domain from .env file
  const fromEmail = `Mailgun Sandbox <postmaster@sandbox84e46e381ff14dc6a9c970aa1f3d1dc3.mailgun.org>`;

  const mailData = {
    from: fromEmail,
    to: [to], // The recipient's email address
    subject: subject, // The email subject
    text: text, // The email body
  };

  try {
    const result = await mg.messages.create(domain, mailData);
    console.log("✅ Email sent successfully!", result);
    return result; // Return the result on success
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error; // Throw the error to be handled by the caller
  }
};

// Export the function to be used in other files
module.exports = { sendEmail };