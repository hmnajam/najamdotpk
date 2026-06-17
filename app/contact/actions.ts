"use server";

import { Resend } from "resend";
import { z } from "zod";

import { siteConfig } from "@/config/site";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message is too short").max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      status: "error",
      message: "Email is not configured yet. Please try again later.",
    };
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? siteConfig.socials.email,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { status: "error", message: "Failed to send. Please try again." };
    }

    return { status: "success", message: "Thanks — I'll get back to you soon." };
  } catch (err) {
    console.error("Contact send failed:", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
