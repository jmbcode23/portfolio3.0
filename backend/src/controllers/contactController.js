import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const INBOX_TO = process.env.CONTACT_INBOX_TO || "jonathanmilolocode@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM || "Portfolio <support@updates.b-cleanservice.com>";

export async function sendContactEmail(params) {
  const { name, email, subject, message } = params;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: INBOX_TO,
    subject: `[Contact] ${subject}`,
    replyTo: email, // so you can hit "Reply" in Gmail
    html: contactHtmlTemplate({ name, email, subject, message }),
    text: contactTextTemplate({ name, email, subject, message }),
  });
}

function contactTextTemplate({ name, email, subject, message }) {
  return `New contact form submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`;
}

function escapeHtml(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function contactHtmlTemplate({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  return `
<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f3f4f6; padding:24px;">
    <div style="max-width:640px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,.08);">
      <div style="padding:18px 24px; background:#111827; color:#fff;">
        <h2 style="margin:0; font-size:18px;">New Contact Form Message</h2>
      </div>

      <div style="padding:24px; color:#111827; line-height:1.6;">
        <p style="margin:0 0 12px;"><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p style="margin:0 0 12px;"><strong>Subject:</strong> ${safeSubject}</p>

        <div style="margin-top:16px; padding:16px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:10px;">
          ${safeMessage}
        </div>

        <p style="margin-top:18px; font-size:12px; color:#6b7280;">
          Tip: just hit “Reply” — this email uses reply-to = ${safeEmail}.
        </p>
      </div>
    </div>
  </body>
</html>
`;
}
