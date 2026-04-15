/** Preferred delivery / pickup windows (Koreatown scheduling). Values are stored in Stripe metadata. */

export const DELIVERY_PICKUP_WINDOWS = [
  { value: "weekday_am", label: "Weekday · 8am–12pm" },
  { value: "weekday_pm", label: "Weekday · 12pm–5pm" },
  { value: "sat_am", label: "Saturday · 9am–1pm" },
  { value: "flex", label: "Flexible — coordinate by phone" },
] as const;

export type DeliveryPickupWindowValue = (typeof DELIVERY_PICKUP_WINDOWS)[number]["value"];

const WINDOW_VALUES = new Set<string>(DELIVERY_PICKUP_WINDOWS.map((w) => w.value));

export function getWindowLabel(value: string): string {
  const found = DELIVERY_PICKUP_WINDOWS.find((w) => w.value === value);
  return found?.label ?? value;
}

export function isValidDeliveryPickupWindow(value: unknown): value is string {
  return typeof value === "string" && WINDOW_VALUES.has(value);
}
