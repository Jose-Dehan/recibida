import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { LOW_STOCK_THRESHOLD } from "@/lib/pricing-tier";

export function CurrentPriceCard({ price, tierLabel = null, remainingInTier = null, nextTierPrice = null, soldOut = false, compact = false, featured = false, loading = false, error = null }: { price: number | null; tierLabel?: string | null; remainingInTier?: number | null; nextTierPrice?: number | null; soldOut?: boolean; compact?: boolean; featured?: boolean; loading?: boolean; error?: string | null }) {
  const lowStock = !soldOut && remainingInTier !== null && remainingInTier > 0 && remainingInTier <= LOW_STOCK_THRESHOLD;

  if (featured) {
    if (!loading && !error && (soldOut || price === null)) {
      return (
        <section className="relative overflow-hidden rounded-[28px] border border-red-300/[0.16] bg-[linear-gradient(135deg,rgba(127,29,29,0.12),rgba(18,18,19,0.94)_48%,rgba(10,11,11,0.98))] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:px-7">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-200/30 to-transparent" />
          <div className="relative">
            <h2 className="text-[clamp(2rem,10vw,3rem)] font-black leading-none tracking-[-0.05em] text-white">Entradas agotadas</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">Ya se alcanzó la capacidad máxima del evento.</p>
          </div>
        </section>
      );
    }

    return (
      <section className="group relative overflow-hidden rounded-[28px] border border-accent/25 bg-[linear-gradient(135deg,rgba(214,243,106,0.12),rgba(18,20,17,0.88)_42%,rgba(12,13,12,0.96))] px-6 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.48),0_0_45px_rgba(214,243,106,0.08)] backdrop-blur-xl transition duration-300 hover:border-accent/40 hover:shadow-[0_24px_75px_rgba(0,0,0,0.48),0_0_55px_rgba(214,243,106,0.13)] sm:px-7 sm:py-7">
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-accent/[0.14] blur-3xl transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Entrada actual</p>
              <p className="mt-3 text-[clamp(2.8rem,14vw,4rem)] font-black leading-none tracking-[-0.065em] text-white [text-shadow:0_0_30px_rgba(255,255,255,0.08)]">
                {loading ? "Cargando…" : error ? "No disponible" : formatPrice(price as number)}
              </p>
            </div>
            {!loading && tierLabel && (
              <span className="mt-0.5 shrink-0 rounded-full border border-accent/30 bg-accent/[0.1] px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-accent shadow-[0_0_20px_rgba(214,243,106,0.1)]">
                {tierLabel}
              </span>
            )}
          </div>

          {!loading && !error && price !== null && lowStock && (
            <p className="mt-4 inline-flex max-w-full rounded-full border border-red-500/40 bg-red-500/10 px-3 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.1em] text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              Quedan pocas entradas
            </p>
          )}

          {!loading && !error && price !== null && lowStock && nextTierPrice !== null && (
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                <span>Soon</span>
                <ArrowRight aria-hidden="true" className="h-3 w-3 text-accent/70" strokeWidth={2} />
                <span className="font-extrabold tracking-[-0.01em] text-zinc-300">{formatPrice(nextTierPrice)}</span>
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[20px] border border-line/80 bg-[#141416] px-5 py-4 shadow-card">
      <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-accent/[0.035] blur-2xl" />
      <div className="relative flex items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-zinc-400">Entrada actual</p><p className={`${compact ? "mt-1 text-[2rem]" : "mt-1.5 text-[2.35rem]"} font-extrabold leading-none tracking-[-0.045em]`}>{loading ? "Cargando…" : error ? "No disponible" : price === null ? "Entradas agotadas" : formatPrice(price)}</p></div>
        {!loading && tierLabel && <span className="mb-0.5 shrink-0 rounded-full border border-line bg-[#101012] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{tierLabel}</span>}
      </div>
    </section>
  );
}
