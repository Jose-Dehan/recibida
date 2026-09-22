import { CalendarDays, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { eventBenefit, eventDate, eventName } from "@/lib/event-data";

export function EventInfoCard({ price, showName = false }: { price?: number | null; showName?: boolean }) {
  return (
    <section className="glass-card px-4 py-4 sm:px-5 sm:py-[18px]">
      {showName && <p className="mb-3 text-base font-extrabold tracking-tight text-white">{eventName}</p>}
      <div className="flex items-center gap-2.5 text-sm font-semibold text-zinc-200">
        <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.9} />
        <span>{eventDate}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.08] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-accent">
          <Sparkles aria-hidden="true" className="h-3 w-3" />{eventBenefit}
        </span>
        {price !== undefined && price !== null && (
          <span className="ml-auto text-sm font-black tracking-tight text-white">{formatPrice(price)}</span>
        )}
      </div>
    </section>
  );
}
