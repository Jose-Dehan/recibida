import { formatPrice } from "@/lib/format";
import type { Reservation } from "@/types";
import { StatusBadge } from "./StatusBadge";

export function MobileReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <article className="rounded-[20px] border border-line bg-panel p-5 shadow-card">
      <div className="flex items-start justify-between gap-3"><div><h3 className="font-black">{reservation.name}</h3><p className="mt-1 text-sm text-zinc-400">DNI {reservation.dni}</p></div><StatusBadge status={reservation.status} /></div>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4"><div><p className="font-black">{formatPrice(reservation.price)}</p><p className="mt-1 text-xs text-zinc-400">{reservation.tier}</p></div><p className="break-all text-right text-xs font-bold text-zinc-400">{reservation.code}</p></div>
    </article>
  );
}
