import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, otp: string) {
  try {
    const response = await resend.emails.send({
      from: "Ubryft Security <support@updates.b-cleanservice.com>",
      to,
      subject: `${otp} is your verification code`,
      html: getHtmlTemplate(otp),
    });

    console.log("EMAIL SENT RESPONSE:", response);
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
  }
}

function getHtmlTemplate(otp: string) {
  // Brand Colors
  const brandColor = "#8c8fff";
  const backgroundColor = "#f3f4f6";
  const textColor = "#1f2937";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${backgroundColor}; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: ${brandColor}; padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px; }
    .content { padding: 40px; color: ${textColor}; line-height: 1.6; }
    .otp-container { background-color: #f9fafb; border: 2px dashed ${brandColor}; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
    .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: ${brandColor}; margin: 0; font-family: monospace; }
    .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Ubryft</h1>
    </div>

    <div class="content">
      <h2 style="margin-top: 0; color: #111827;">Verify your email address</h2>
      <p>Welcome to Ubryft! To complete your sign-up, please enter the verification code below.</p>
      
      <div class="otp-container">
        <p class="otp-code">${otp}</p>
      </div>

      <p>This code will expire in 10 minutes.</p>
      <p>If you did not request this code, please ignore this email or contact support if you have concerns.</p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Ubryft Inc. All rights reserved.</p>
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;
}
