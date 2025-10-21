import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message, appointmentDate } = req.body;

    // Set up the email transporter with hardcoded settings
    const transporter = nodemailer.createTransport({
      host: "mail.masoutfits.com",
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
        user: "info@masoutfits.com",
        pass: "Mas@2015",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "info@masoutfits.com", // Use your email as sender
      to: "info@masoutfits.com", // Send to your email
      replyTo: email, // Allow reply to the customer's email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Appointment Date:</strong> ${
          appointmentDate || "Not specified"
        }</p>
        <p><strong>Message:</strong><br> ${message}</p>
        <hr>
        <p><em>This message was sent from the MAS Outfits contact form.</em></p>
      `,
    };

    // Send the email
    try {
      // Test the connection first
      await transporter.verify();
      console.log("SMTP connection verified successfully");

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Detailed error sending email:", error);

      // Fallback: Log the contact form data to console for manual follow-up
      console.log("=== CONTACT FORM SUBMISSION ===");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Appointment Date:", appointmentDate);
      console.log("Message:", message);
      console.log("=============================");

      return res.status(500).json({
        message: `Email service temporarily unavailable. Your message has been logged. Error: ${error.message}`,
      });
    }
  } else {
    // If the request is not a POST request, return 405 (Method Not Allowed)
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
