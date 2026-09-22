import { formatPrice } from "@/lib/format";
import { CopyButton } from "./CopyButton";

type ReservationSummary = { name: string; code: string; price: number; expiresAt?: string };

export function ReservationSummaryCard({ reservation, showCode = true }: { reservation: ReservationSummary; showCode?: boolean }) {
  return (
    <section className="relative overflow-hidden rounded-[18px] border border-line/80 bg-[#141416] shadow-card sm:rounded-[20px]">
      <div className="p-4 sm:p-5">
        <p className="text-sm text-zinc-500">A nombre de</p>
        <p className="mt-1 text-lg font-semibold">{reservation.name}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
          <div><p className="text-xs text-zinc-500">Precio</p><p className="mt-1 text-xl font-bold tracking-tight">{formatPrice(reservation.price)}</p></div>
          {reservation.expiresAt && <div><p className="text-xs text-zinc-500">Fecha límite</p><p className="mt-1 font-semibold">{reservation.expiresAt}</p></div>}
        </div>
      </div>
      {showCode && <div className="border-t border-dashed border-line px-4 py-4 sm:px-5">
        <p className="text-xs text-zinc-500">Código de reserva</p>
        <div className="mt-2 flex min-w-0 flex-wrap items-center justify-between gap-3"><p className="min-w-0 break-all font-mono text-lg font-bold tracking-[0.06em] text-accent sm:text-xl sm:tracking-[0.08em]">{reservation.code}</p><CopyButton value={reservation.code} label="Copiar código" copiedLabel="Código copiado ✓" /></div>
      </div>}
    </section>
  );
}
