# Resend Email Configuration

## Environment Variables Required

Create a `.env.local` file in your project root with the following:

```
RESEND_API_KEY=your_resend_api_key_here
```

## Getting Your Resend API Key

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Sign up or log in to your Resend account
3. Create a new API key
4. Copy the API key and replace `your_resend_api_key_here` in your `.env.local` file

## Usage

The email functionality is now set up with:

- **EmailTemplate component**: `components/EmailTemplate.js`
- **API endpoint**: `pages/api/send-email.js`

To send an email, make a POST request to `/api/send-email` with the required data.

## Example Usage

```javascript
// In your frontend code
const sendEmail = async () => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Add any required data here
    }),
  });

  const result = await response.json();
  console.log(result);
};
```
