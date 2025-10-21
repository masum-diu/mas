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
      replyTo: email, // Allow reply to customer's email
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
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }
  } else {
    // If the request is not a POST request, return 405 (Method Not Allowed)
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
