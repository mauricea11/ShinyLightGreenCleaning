import type { NextApiRequest, NextApiResponse } from "next";

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to_email } = req.body;

  if (!to_email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return res.status(500).json({ error: "EmailJS not configured" });
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          to_email,
          subject: "Welcome to Shiny Light Cleaning!",
          message: `Thank you for signing up! You'll now receive updates about new products, exclusive discounts, and events at Clark Park Farmers Market every Saturday.`,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({
        error: "Failed to send email",
        details: data,
      });
    }
  } catch (error) {
    console.error("EmailJS error:", error);
    res.status(500).json({
      error: "Failed to send email",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
