export interface LeadPayload {
  type: 'Ön Kayıt (Hero)' | 'Tanışma Dersi (Popup)' | 'Etkinlik Katılım (RSVP)';
  name: string;
  phone: string;
  email?: string;
  campus?: string;
  discipline?: string;
  ageOrYear?: string;
}

/**
 * Submits lead data to `./api/apply.php` when hosted on a cPanel PHP/Apache server.
 * Gracefully resolves even in static preview environments where PHP is not active.
 */
export async function submitLeadToServer(payload: LeadPayload): Promise<void> {
  try {
    await fetch('./api/apply.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking fallback when running in local dev or static preview without PHP
  }
}
