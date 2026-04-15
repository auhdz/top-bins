import { Resend } from "resend";

import { site } from "@/lib/site";

type SubscriptionEmailPayload = {
  customerEmail: string | null;
  standardBins: number;
  largeCrates: number;
  totalBins: number;
  stripeSubscriptionId: string;
  deliveryWindowLabel?: string | null;
  pickupWindowLabel?: string | null;
  scheduleNotes?: string | null;
};

/**
 * Sends order-confirmation style emails when RESEND_API_KEY and EMAIL_FROM are set.
 * Configure RESEND_API_KEY in Dashboard: https://resend.com/api-keys
 */
export async function sendSubscriptionStartedEmails(payload: SubscriptionEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const notifyTo = process.env.EMAIL_ORDER_NOTIFY_TO?.trim() ?? site.email;

  if (!apiKey || !from) {
    console.info(
      "[email] Skipping subscription emails (set RESEND_API_KEY and EMAIL_FROM to enable)."
    );
    return;
  }

  const client = new Resend(apiKey);

  const scheduleBlock = [
    payload.deliveryWindowLabel ? `Delivery window: ${payload.deliveryWindowLabel}` : null,
    payload.pickupWindowLabel ? `Pickup window: ${payload.pickupWindowLabel}` : null,
    payload.scheduleNotes ? `Notes: ${payload.scheduleNotes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const summaryLines = [
    `Subscription: ${payload.stripeSubscriptionId}`,
    `Standard bins: ${payload.standardBins}`,
    `Large crates: ${payload.largeCrates}`,
    `Total units: ${payload.totalBins}`,
    scheduleBlock ? `\nScheduling:\n${scheduleBlock}` : "",
  ].join("\n");

  const text = [
    `Thanks for subscribing to ${site.name}.`,
    "",
    "We're setting up your weekly rental. We'll follow up to confirm delivery and pickup in Koreatown.",
    "",
    summaryLines,
    "",
    `Questions? Reply to this email or write ${site.email}.`,
  ].join("\n");

  const htmlSchedule =
    scheduleBlock.length > 0
      ? `<p><strong>Scheduling</strong></p><pre style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;">${scheduleBlock.replace(/</g, "&lt;")}</pre>`
      : "";

  const html = `<p>Thanks for subscribing to <strong>${site.name}</strong>.</p>
<p>We're setting up your weekly rental. We'll follow up to confirm delivery and pickup in Koreatown.</p>
<pre style="font-family:system-ui,sans-serif;font-size:14px;">${summaryLines.replace(/</g, "&lt;")}</pre>
${htmlSchedule}
<p>Questions? ${site.email}</p>`;

  if (payload.customerEmail) {
    const { error } = await client.emails.send({
      from,
      to: payload.customerEmail,
      subject: `${site.name} — subscription started`,
      text,
      html,
    });
    if (error) console.error("[email] customer send failed", error);
  }

  if (notifyTo) {
    const { error } = await client.emails.send({
      from,
      to: notifyTo,
      subject: `[${site.name}] New subscription ${payload.stripeSubscriptionId}`,
      text: [`New rental subscription`, "", summaryLines, "", `Customer: ${payload.customerEmail ?? "—"}`].join(
        "\n"
      ),
    });
    if (error) console.error("[email] notify send failed", error);
  }
}
