import type { ReservationStatus } from "@/types";

const styles: Record<ReservationStatus, string> = { Pendiente: "border-amber-500/40 bg-amber-500/10 text-amber-300", Aprobado: "border-accent/40 bg-accent/10 text-accent", Vencido: "border-zinc-600 bg-zinc-800 text-zinc-300", Rechazado: "border-red-500/40 bg-red-500/10 text-red-300" };

export function StatusBadge({ status }: { status: ReservationStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}
