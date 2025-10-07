export type LeadPayload = {
  timestamp: string;
  name: string;
  business: string;
  website: string;
  interest: string;
  painPoints: string[];
  email: string;
  consent: boolean;
  source: string;
  ts: number;
  freestyle: string;
};

/**
 * Fire-and-forget POST to n8n webhook.
 * Uses N8N_WEBHOOK_URL if set, otherwise falls back to the production URL.
 */
export function sendToN8n(payload: LeadPayload) {
  try {
    const url = process.env.N8N_WEBHOOK_URL || "https://n8n.southvilleforge.com/webhook/lead";
    // Fire-and-forget; don't await
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      // swallow errors; do not impact user experience
    });
  } catch {
    // no-op
  }
}
