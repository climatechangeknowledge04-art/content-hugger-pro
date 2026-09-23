import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20)
    .regex(/^\+?[0-9][0-9 ()-]{6,19}$/, "Please enter a valid phone number."),
  floor: z.enum([
    "1st Floor — INR 1.00 Cr",
    "2nd Floor — INR 1.15 Cr",
    "3rd Floor — INR 1.25 Cr",
    "No preference yet",
  ]),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

const OWNER_EMAIL = "montvue.dharamshala@gmail.com";

function toBase64(value: string) {
  return btoa(
    Array.from(new TextEncoder().encode(value), (byte) => String.fromCharCode(byte)).join(""),
  );
}

async function sendOwnerEmail(data: EnquiryInput) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["GOOGLE_MAIL_API_KEY"];

  if (!lovableKey || !connectionKey) return;

  const lines = [
    `To: ${OWNER_EMAIL}`,
    `Subject: New Mont Vue enquiry from ${data.name}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Interested in: ${data.floor}`,
    "",
    "Sent from the Mont Vue Residences website enquiry form.",
  ].join("\r\n");

  const raw = toBase64(lines).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const response = await fetch(
    "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connectionKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    },
  );

  if (!response.ok) {
    console.error(`Enquiry email failed [${response.status}]: ${await response.text()}`);
  }
}

export const submitPropertyEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];

    if (!url || !key) {
      throw new Error("The enquiry service is temporarily unavailable.");
    }

    const response = await fetch(`${url}/rest/v1/property_enquiries`, {
      method: "POST",
      headers: {
        apikey: key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Your enquiry could not be saved.");
    }

    await sendOwnerEmail(data).catch((error) => {
      console.error("Enquiry email error", error);
    });

    return { success: true };
  });