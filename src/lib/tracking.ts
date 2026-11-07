import type { CourierOption } from "@/lib/settings-types";

/**
 * Builds the courier's tracking page link, or "" when none is set up.
 * The saved link can contain {id} where the tracking number goes. If it has no
 * {id}, the tracking number is added at the end (for links like ...?cn=).
 */
export function buildTrackingUrl(template: string | undefined, trackingId: string): string {
  if (!template || !template.startsWith("https://") || !trackingId) return "";
  const id = encodeURIComponent(trackingId);
  return template.includes("{id}") ? template.replace(/\{id\}/g, id) : `${template}${id}`;
}

export function trackingLink(
  couriers: CourierOption[] | undefined,
  courier: string | undefined,
  trackingId: string | undefined,
): string {
  if (!trackingId || !courier) return "";
  const match = couriers?.find((c) => c.name.toLowerCase() === courier.toLowerCase());
  return buildTrackingUrl(match?.trackingUrl, trackingId);
}

/**
 * Turns a real tracking link into a reusable template: paste the link you get
 * when you track any parcel, plus that parcel's tracking number.
 */
export function templateFromSampleLink(sampleLink: string, sampleId: string): string | null {
  const link = sampleLink.trim();
  const id = sampleId.trim();
  if (!link.startsWith("https://") || !id || !link.includes(id)) return null;
  return link.replace(id, "{id}");
}
