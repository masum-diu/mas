import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message, appointmentDate } = req.body;

    try {
      // Log the contact form data
      console.log("Contact Form Submission:", {
        name,
        email,
        phone,
        message,
        appointmentDate,
      });

      // Try to send email with timeout
      const emailPromise = sendEmail(
        name,
        email,
        phone,
        message,
        appointmentDate
      );
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), 5000)
      );

      try {
        await Promise.race([emailPromise, timeoutPromise]);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.log("Email sending failed or timed out:", emailError.message);
        // Continue anyway - don't fail the form submission
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
