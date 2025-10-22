# Email Configuration Setup

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Private environment variables (server-side only)
EMAIL_USER=info@masoutfits.com
EMAIL_PASS=Mas@2015
EMAIL_HOST=mail.masoutfits.com
EMAIL_PORT=465

# Public environment variables (accessible on client-side)
NEXT_PUBLIC_EMAIL_USER=info@masoutfits.com
NEXT_PUBLIC_EMAIL_HOST=mail.masoutfits.com
NEXT_PUBLIC_EMAIL_PORT=465
```

## Important Notes:

1. **NEXT_PUBLIC_*** variables are accessible on both client and server side
2. **Regular variables** (without NEXT_PUBLIC_) are only accessible on the server side
3. **EMAIL_PASS** should remain private and not be exposed as a public variable
4. The contact API will use public variables first, then fall back to private variables

## For Production Deployment:

Make sure to set these environment variables in your hosting platform:
- Vercel: Add them in the Environment Variables section
- Netlify: Add them in Site Settings > Environment Variables
- Other platforms: Set them in your hosting control panel

## Testing:

The contact form will now use the public environment variables for email configuration while keeping the password secure on the server side.
