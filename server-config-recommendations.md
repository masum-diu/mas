# Server Configuration for 504 Gateway Timeout Fix

## The Problem

504 Gateway Timeout errors occur at the server/gateway level (nginx, Apache, or hosting provider) before reaching your application code.

## Solutions Implemented in Code

1. ✅ Increased API timeout from 10s to 30s
2. ✅ Added nodemailer timeout configurations (30s)
3. ✅ Implemented async email sending with immediate response
4. ✅ Added better error handling and logging
5. ✅ Updated Next.js configuration

## Server-Level Configuration Needed

### For Nginx (if using nginx)

Add to your nginx configuration:

```nginx
server {
    # Increase proxy timeouts
    proxy_connect_timeout 30s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;

    # Increase client timeouts
    client_body_timeout 30s;
    client_header_timeout 30s;

    # For API routes specifically
    location /api/ {
        proxy_pass http://your-app;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
```

### For Apache (if using Apache)

Add to your .htaccess or virtual host:

```apache
# Increase timeout values
Timeout 30
ProxyTimeout 30

# For specific API routes
<Location "/api/">
    ProxyTimeout 30
</Location>
```

### For Hosting Providers

#### Vercel

Add to `vercel.json`:

```json
{
  "functions": {
    "pages/api/contact.js": {
      "maxDuration": 30
    }
  }
}
```

#### Netlify

Add to `netlify.toml`:

```toml
[build.environment]
  NETLIFY_TIMEOUT = "30"
```

#### Shared Hosting (cPanel)

1. Contact your hosting provider to increase:
   - PHP max_execution_time
   - Server timeout settings
   - Gateway timeout settings

### Environment Variables

Add these to your `.env.local`:

```env
# Email configuration with longer timeouts
EMAIL_HOST=mail.masoutfits.com
EMAIL_PORT=465
EMAIL_USER=info@masoutfits.com
EMAIL_PASS=Mas@2015

# Node.js timeout settings
NODE_OPTIONS="--max-old-space-size=4096"
```

## Testing the Fix

1. Deploy the updated code
2. Test the contact form submission
3. Check server logs for any remaining timeout issues
4. Monitor email delivery in the background

## Additional Recommendations

1. Consider using a queue system (like Bull/BullMQ) for email processing
2. Implement email retry logic for failed attempts
3. Use a dedicated email service (SendGrid, Mailgun) for better reliability
4. Monitor server resources and email delivery rates
