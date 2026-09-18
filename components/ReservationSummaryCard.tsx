import { formatPrice } from "@/lib/format";
import { CopyButton } from "./CopyButton";

type ReservationSummary = { name: string; code: string; price: number; expiresAt: string };

export function ReservationSummaryCard({ reservation }: { reservation: ReservationSummary }) {
  return (
    <section className="relative overflow-hidden rounded-[20px] border border-line/80 bg-[#141416] shadow-card">
      <div className="p-5">
        <p className="text-sm text-zinc-500">A nombre de</p>
        <p className="mt-1 text-lg font-semibold">{reservation.name}</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div><p className="text-xs text-zinc-500">Precio</p><p className="mt-1 text-xl font-bold tracking-tight">{formatPrice(reservation.price)}</p></div>
          <div><p className="text-xs text-zinc-500">Fecha límite</p><p className="mt-1 font-semibold">{reservation.expiresAt}</p></div>
        </div>
      </div>
      <div className="border-t border-dashed border-line px-5 py-4">
        <p className="text-xs text-zinc-500">Código de reserva</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3"><p className="break-all font-mono text-xl font-bold tracking-[0.08em] text-accent">{reservation.code}</p><CopyButton value={reservation.code} label="Copiar código" copiedLabel="Código copiado ✓" /></div>
      </div>
    </section>
  );
}
