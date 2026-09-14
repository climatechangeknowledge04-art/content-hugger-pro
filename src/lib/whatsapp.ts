export const WHATSAPP_NUMBER = "919911536697";
export const PHONE_DISPLAY = "+91 99115 36697";

export const DEFAULT_ENQUIRY =
  "Hi, I'm interested in Mont Vue Residences. Please share details.";

export function waLink(message: string = DEFAULT_ENQUIRY) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
