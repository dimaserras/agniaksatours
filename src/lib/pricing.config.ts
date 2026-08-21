// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR PREVIEW PRICING.
// Pricing is NOT finalised. Every "Starting from" figure on the site reads from
// here — change the numbers below (one line each) once real pricing is approved,
// then flip PRICING_IS_FINAL to true to drop the "indicative" disclaimer.
// DO NOT hardcode prices in components.
// ---------------------------------------------------------------------------
import { formatIDR, PRICING } from "@/lib/site";

export const PRICING_IS_FINAL = false;

/** Shown next to any price while pricing is provisional. */
export const PRICING_DISCLAIMER = "Indicative only — final pricing confirmed on WhatsApp.";

export type TierName = "Classic" | "Signature" | "VIP";

export const TIER_PREVIEW: {
  name: TierName;
  desc: string;
  startingFrom: number;
  unit: string;
  featured?: boolean;
}[] = [
  {
    name: "Classic",
    desc: "Core destinations only.",
    startingFrom: PRICING.tiers.Classic[6],
    unit: "pax",
  },
  {
    name: "Signature",
    desc: "Our most recommended, with added heritage stops.",
    startingFrom: PRICING.tiers.Signature[6],
    unit: "pax",
    featured: true,
  },
  {
    name: "VIP",
    desc: "Full experience with premium add-ons.",
    startingFrom: PRICING.tiers.VIP[6],
    unit: "pax",
  },
];

export function startingFromLabel(amount: number, unit: string): string {
  return `${formatIDR(amount)}/${unit}`;
}
