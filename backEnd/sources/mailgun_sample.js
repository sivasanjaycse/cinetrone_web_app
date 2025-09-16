const FormData = require("form-data");
const Mailgun = require("mailgun.js");

async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: "3021c6bbd13b0d59fcfdddee5c1048bf-3c134029-4270a90",
  });

  try {
    const data = await mg.messages.create(
      "sandbox84e46e381ff14dc6a9c970aa1f3d1dc3.mailgun.org",
      {
        from: "Mailgun Sandbox <postmaster@sandbox84e46e381ff14dc6a9c970aa1f3d1dc3.mailgun.org>",
        to: ["Cinetrone <cinetronewebtech@gmail.com>"],
        subject: "Hello Cinetrone",
        text: "Testing mail sent by developer !",
      }
    );

    console.log("Email sent successfully!", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendSimpleMessage(); // Call the function to run it