// src/pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { firstName, lastName, email, service, message } = req.body;

    // Call EmailJS API directly
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          template_params: {
            firstName,
            lastName,
            email,
            service,
            message,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS error:", errorText); // <-- log their response
      return res
        .status(500)
        .json({ error: "EmailJS request failed", details: errorText });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
