import { formatPrice } from "@/lib/format";

export function CurrentPriceCard({ price, compact = false, loading = false }: { price: number | null; compact?: boolean; loading?: boolean }) {
  return (
    <section className="relative overflow-hidden rounded-[20px] border border-line/80 bg-[#141416] px-5 py-4 shadow-card">
      <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-accent/[0.035] blur-2xl" />
      <div className="relative flex items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-zinc-400">Entrada actual</p><p className={`${compact ? "mt-1 text-[2rem]" : "mt-1.5 text-[2.35rem]"} font-extrabold leading-none tracking-[-0.045em]`}>{loading ? "Cargando…" : price === null ? "Entradas agotadas" : formatPrice(price)}</p></div>
        {!loading && price !== null && <span className="mb-0.5 shrink-0 rounded-full border border-line bg-[#101012] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Precio vigente</span>}
      </div>
    </section>
  );
}
