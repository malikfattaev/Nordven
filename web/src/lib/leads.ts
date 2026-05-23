import { serverEnv } from "@/lib/env";
import type { Locale } from "@/i18n/routing";
import type { ContactInterestSlug } from "@/content/services";

export type Lead = {
  name: string;
  email: string;
  company?: string;
  serviceInterest?: ContactInterestSlug;
  message: string;
  locale: Locale;
};

export type LeadDeliveryResult = {
  ok: boolean;
  forwarded: boolean;
  reason?: string;
};

export async function deliverLead(lead: Lead): Promise<LeadDeliveryResult> {
  console.info("[lead]", {
    email: lead.email,
    serviceInterest: lead.serviceInterest,
    locale: lead.locale,
    receivedAt: new Date().toISOString(),
  });

  if (!serverEnv.CONTACT_WEBHOOK_URL) {
    return { ok: true, forwarded: false, reason: "no_webhook_configured" };
  }

  try {
    const response = await fetch(serverEnv.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        source: "nordven-web",
        name: lead.name,
        email: lead.email,
        _replyto: lead.email,
        company: lead.company,
        serviceInterest: lead.serviceInterest,
        message: lead.message,
        locale: lead.locale,
      }),
    });
    if (!response.ok) {
      return { ok: false, forwarded: false, reason: `webhook_status_${response.status}` };
    }
    return { ok: true, forwarded: true };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    return { ok: false, forwarded: false, reason };
  }
}
