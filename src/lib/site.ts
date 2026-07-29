// Central config — trivially swappable placeholders.
export const WHATSAPP_NUMBER = "PLACEHOLDER_NUMBER";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PRICING = {
  tiers: {
    Classic: { 2: 1_500_000, 4: 1_200_000, 6: 950_000 },
    Signature: { 2: 2_000_000, 4: 1_600_000, 6: 1_300_000 },
    VIP: { 2: 3_000_000, 4: 2_400_000, 6: 1_950_000 },
  } as const,
  beyond: [
    { key: "volcano", title: "Volcano Lava Trip", price: 700_000, unit: "pax" },
    { key: "dieng", title: "Dieng Plateau", price: 1_500_000, unit: "pax" },
    { key: "airport", title: "Airport Transfer", price: 450_000, unit: "car" },
    { key: "bromo", title: "Bromo Transfer", price: 5_000_000, unit: "car" },
    { key: "karimunjawa", title: "Karimunjawa Transfer", price: 1_500_000, unit: "car" },
    { key: "bali", title: "Bali Transfer", price: 7_000_000, unit: "car" },
  ],
};

export function formatIDR(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function tierPerPax(tier: "Classic" | "Signature" | "VIP", guests: number): number {
  const table = PRICING.tiers[tier];
  if (guests <= 2) return table[2];
  if (guests <= 4) return table[4];
  return table[6];
}