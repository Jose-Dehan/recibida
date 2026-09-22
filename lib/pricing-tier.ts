const pricingTiers = [
  { price: 35000, name: "PREVENTA" },
  { price: 40000, name: "TANDA 1" },
  { price: 45000, name: "TANDA 2" },
  { price: 50000, name: "TANDA 3" },
  { price: 55000, name: "LAST CHANCE" },
] as const;

export const LOW_STOCK_THRESHOLD = 30;

export function getTierName(price: number | null) {
  return pricingTiers.find((tier) => tier.price === price)?.name ?? null;
}

export function getNextTierPrice(price: number | null) {
  const currentTierIndex = pricingTiers.findIndex((tier) => tier.price === price);

  if (currentTierIndex < 0 || currentTierIndex === pricingTiers.length - 1) return null;

  return pricingTiers[currentTierIndex + 1].price;
}
