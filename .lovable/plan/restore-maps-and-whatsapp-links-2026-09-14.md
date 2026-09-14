# Restore Maps and WhatsApp links

## Changes
- Replace the blocked embedded map with the existing location image linked to Google Maps.
- Use direct, universal Google Maps and directions links that do not require an API key.
- Replace WhatsApp Web/app detection with a direct `wa.me` link so every WhatsApp button opens reliably.

## Verification
- Check all map and WhatsApp buttons expose the correct destination and open in a new tab.
- Confirm the location section renders without the blocked API message.
