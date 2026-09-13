export const WHATSAPP_NUMBER = "919911536697";
export const PHONE_DISPLAY = "+91 99115 36697";

export const DEFAULT_ENQUIRY =
  "Hi, I'm interested in Mont Vue Residences. Please share details.";

export function waLink(message: string = DEFAULT_ENQUIRY) {
  return `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

/** Use the native app on phones and WhatsApp Web on larger screens. */
export function openWhatsApp(message?: string) {
  const text = encodeURIComponent(message ?? DEFAULT_ENQUIRY);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile
    ? `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${text}`
    : waLink(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
