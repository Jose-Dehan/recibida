const tierNamesByPrice = new Map<number, string>([
  [35000, "PREVENTA"],
  [40000, "TANDA 1"],
  [45000, "TANDA 2"],
  [50000, "TANDA 3"],
  [55000, "LAST CHANCE"],
]);

export function getTierName(price: number | null) {
  return price === null ? null : tierNamesByPrice.get(price) ?? null;
}
