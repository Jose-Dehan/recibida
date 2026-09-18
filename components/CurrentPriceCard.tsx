import { formatPrice } from "@/lib/format";

export function CurrentPriceCard({ price, compact = false }: { price: number; compact?: boolean }) {
  return (
    <section className={`rounded-2xl border border-line bg-panel ${compact ? "p-5" : "p-6"}`}>
      <p className="eyebrow">Precio actual</p>
      <p className={`${compact ? "mt-2 text-3xl" : "mt-3 text-5xl"} font-black tracking-tight`}>{formatPrice(price)}</p>
    </section>
  );
}
