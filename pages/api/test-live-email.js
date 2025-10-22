export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Live server test endpoint working',
      timestamp: new Date().toISOString(),
      environment: {
        EMAIL_HOST: process.env.EMAIL_HOST || 'NOT SET',
        EMAIL_PORT: process.env.EMAIL_PORT || 'NOT SET',
        EMAIL_USER: process.env.EMAIL_USER || 'NOT SET',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
        NEXT_PUBLIC_EMAIL_HOST: process.env.NEXT_PUBLIC_EMAIL_HOST || 'NOT SET',
        NEXT_PUBLIC_EMAIL_PORT: process.env.NEXT_PUBLIC_EMAIL_PORT || 'NOT SET',
        NEXT_PUBLIC_EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER || 'NOT SET'
      }
    });
  }

  if (req.method === 'POST') {
    const { name, email, phone, message, appointmentDate } = req.body;

    try {
      // Test email sending
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST || process.env.EMAIL_HOST || "mail.masoutfits.com",
        port: parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT || process.env.EMAIL_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
          pass: process.env.EMAIL_PASS || "Mas@2015",
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify connection
      await transporter.verify();
      
      // Send test email
      const result = await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
        to: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
        subject: `Test Email from Live Server - ${name}`,
        html: `
          <h2>Test Email from Live Server</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `
      });

      return res.status(200).json({
        message: 'Test email sent successfully from live server',
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Live server email error:', error);
      return res.status(500).json({
        message: 'Failed to send email from live server',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}