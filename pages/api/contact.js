export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message, appointmentDate } = req.body;

    // Simple response without email sending to avoid timeout
    try {
      // Log the contact form data
      console.log("Contact Form Submission:", {
        name,
        email,
        phone,
        message,
        appointmentDate,
      });

      // Return success immediately
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
