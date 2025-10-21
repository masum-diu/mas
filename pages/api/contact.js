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
  // Set up the email transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "mail.masoutfits.com",
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: process.env.EMAIL_PORT === "465" || true,
    auth: {
      user: process.env.EMAIL_USER || "info@masoutfits.com",
      pass: process.env.EMAIL_PASS || "Mas@2015",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || "info@masoutfits.com",
    to: process.env.EMAIL_USER || "info@masoutfits.com",
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p style="margin: 10px 0;"><strong>Appointment Date:</strong> ${
            appointmentDate || "Not specified"
          }</p>
        </div>
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${message}</p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
          <p>This email was sent from the MAS Outfits contact form.</p>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
