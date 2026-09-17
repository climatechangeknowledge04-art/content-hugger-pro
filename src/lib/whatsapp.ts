export const WHATSAPP_NUMBER = "919911536697";
export const PHONE_DISPLAY = "+91 99115 36697";

export const DEFAULT_ENQUIRY =
  "Hi, I'm interested in Mont Vue Residences. Please share details.";

export function waLink(message: string = DEFAULT_ENQUIRY) {
  const query = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
  });

  return `https://web.whatsapp.com/send?${query.toString()}`;
}
