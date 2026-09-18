import { formatPrice } from "@/lib/format";
import type { Reservation } from "@/types";
import { CopyButton } from "./CopyButton";

export function ReservationSummaryCard({ reservation }: { reservation: Reservation }) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <dl className="space-y-5">
        <div><dt className="text-sm text-zinc-400">Nombre:</dt><dd className="mt-1 text-lg font-bold">{reservation.name}</dd></div>
        <div><dt className="text-sm text-zinc-400">Precio reservado:</dt><dd className="mt-1 text-2xl font-black">{formatPrice(reservation.price)}</dd></div>
        <div><dt className="text-sm text-zinc-400">Código:</dt><dd className="mt-1 break-all text-xl font-black tracking-wide">{reservation.code}</dd></div>
      </dl>
      <div className="mt-4"><CopyButton value={reservation.code} label="Copiar código" /></div>
      <p className="mt-5 border-t border-line pt-5 text-sm text-zinc-300">Válida hasta: <strong className="text-white">{reservation.validUntil}</strong></p>
    </section>
  );
}
