# Fix for SMTP Port Blocked Issue

## Problem
Your hosting provider is blocking SMTP port 465, causing "Connection timeout" errors.

## Solutions

### Solution 1: Use Alternative SMTP Ports
Try these ports in order:
1. Port 587 (STARTTLS) - Most reliable
2. Port 25 (Standard SMTP)
3. Port 2525 (Alternative)

### Solution 2: Use Gmail SMTP
1. Create a Gmail account for your business
2. Enable 2-factor authentication
3. Generate an App Password
4. Use Gmail SMTP (more reliable)

### Solution 3: Use Email Service Provider
Consider using:
- SendGrid (Free tier: 100 emails/day)
- Mailgun (Free tier: 5,000 emails/month)
- AWS SES (Very cheap)
- Nodemailer with Gmail

## Quick Fix Commands

### Test Alternative Ports
```bash
# Test port 587
telnet mail.masoutfits.com 587

# Test port 25
telnet mail.masoutfits.com 25

# Test port 2525
telnet mail.masoutfits.com 2525
```

### Update Contact API
Replace your current contact API with the alternative version:

```bash
# Backup current API
cp pages/api/contact.js pages/api/contact-backup.js

# Use alternative API
cp pages/api/contact-alternative.js pages/api/contact.js

# Restart PM2
pm2 restart 6
```

### Test the Fix
1. Submit a test contact form
2. Check PM2 logs: `pm2 logs 6`
3. Verify email delivery

## Alternative: Use Gmail SMTP

1. Create Gmail account: info@masoutfits.com
2. Enable 2FA in Gmail
3. Generate App Password
4. Update contact API with Gmail credentials
5. Test email sending

## Monitoring

Check logs for successful connections:
```bash
pm2 logs 6 | grep "SMTP connection successful"
```

## Troubleshooting

If all ports are blocked:
1. Contact your hosting provider
2. Use Gmail SMTP
3. Use email service provider
4. Use serverless functions (Vercel/Netlify)