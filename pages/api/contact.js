import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message, appointmentDate } = req.body;

    try {
      // Save contact form data to a file
      const contactData = {
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        message,
        appointmentDate: appointmentDate || "Not specified",
      };

      // Create contacts directory if it doesn't exist
      const contactsDir = path.join(process.cwd(), "contacts");
      if (!fs.existsSync(contactsDir)) {
        fs.mkdirSync(contactsDir, { recursive: true });
      }

      // Save to file
      const filename = `contact-${Date.now()}.json`;
      const filepath = path.join(contactsDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(contactData, null, 2));

      console.log("Contact form data saved to:", filepath);

      // Also log to console for immediate viewing
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Appointment Date:", appointmentDate || "Not specified");
      console.log("Message:", message);
      console.log("===================================");

      // Try to send email
      try {
        await sendEmail(name, email, phone, message, appointmentDate);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.log("Email failed but form saved:", emailError.message);
      }

      return res.status(200).json({
        message: "Message received successfully! We'll contact you soon.",
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "Failed to process request." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function sendEmail(name, email, phone, message, appointmentDate) {
  const transporter = nodemailer.createTransport({
    host: "mail.masoutfits.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@masoutfits.com",
      pass: "Mas@2015",
    },
  });

  const mailOptions = {
    from: "info@masoutfits.com",
    to: "info@masoutfits.com",
    replyTo: email,
    subject: `Contact Form: ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Appointment Date:</strong> ${
        appointmentDate || "Not specified"
      }</p>
      <p><strong>Message:</strong><br> ${message}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}
