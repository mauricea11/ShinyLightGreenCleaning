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

    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      console.error("EmailJS env vars missing");
      return res.status(500).json({ error: "EmailJS not configured" });
    }

    // Log incoming data for debugging (do not log private key)
    console.error("send-email incoming body:", req.body);

    // Map form fields to the exact template placeholders provided by the user
    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      accessToken: PRIVATE_KEY,
      template_params: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        service: service,
        message: message,
      },
    };

    const debugPayload = { ...payload } as any;
    delete debugPayload.private_key;
    console.error("EmailJS payload (no private key):", JSON.stringify(debugPayload));

    // Call EmailJS API directly
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS error:", errorText);
      return res.status(500).json({ error: "EmailJS request failed", details: errorText, payload: debugPayload });
    }

    // Respond success to the client
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
