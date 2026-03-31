"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, service, message } = data;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const result = await resend.emails.send({
      from: "Anthopolio Kaloudis <onboarding@resend.dev>",
      to: "hexaigonsoftwaresolutions@gmail.com", // TODO: revert to process.env.CONTACT_EMAIL ?? "kipotexnikesergasies13@gmail.com"
      replyTo: email,
      subject: `Νέο μήνυμα από ${name}`,
      html: `
        <h2>Νέο μήνυμα επικοινωνίας</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;">Όνομα:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${email}</td></tr>
          ${phone ? `<tr><td style="padding:8px;font-weight:bold;">Τηλέφωνο:</td><td style="padding:8px;">${phone}</td></tr>` : ""}
          ${service ? `<tr><td style="padding:8px;font-weight:bold;">Υπηρεσία:</td><td style="padding:8px;">${service}</td></tr>` : ""}
        </table>
        <h3>Μήνυμα:</h3>
        <p style="white-space:pre-wrap;">${message}</p>
      `,
    });

    console.log("Resend result:", JSON.stringify(result));

    if (result.error) {
      console.error("Resend error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: "Failed to send email" };
  }
}
