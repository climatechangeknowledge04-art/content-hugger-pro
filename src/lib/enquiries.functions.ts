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

    return { success: true };
  });