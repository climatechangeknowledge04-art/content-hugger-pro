import { waLink } from "@/lib/whatsapp";

/** Always-visible WhatsApp enquiry button. */
export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_top"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed right-5 bottom-5 z-[60] flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 shadow-lift transition-transform duration-300 hover:scale-105 sm:right-8 sm:bottom-8"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-charcoal-deep"
      >
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.470 0 1.45 1.06 2.86 1.21 3.06.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.47-3.63 8.1-8.1 8.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.11.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.24-4.3c0-4.46 3.64-8.1 8.14-8.05" />
      </svg>
      <span className="hidden text-[0.65rem] font-bold tracking-[0.25em] text-charcoal-deep uppercase sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
