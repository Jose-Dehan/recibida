import type { ReservationStatus } from "@/types";

const labels: Record<ReservationStatus, string> = { pending: "Pendiente", verified: "Verificado", expired: "Vencido", rejected: "Rechazado", cancelled: "Cancelado" };
const styles: Record<ReservationStatus, string> = { pending: "border-amber-500/40 bg-amber-500/10 text-amber-300", verified: "border-accent/40 bg-accent/10 text-accent", expired: "border-zinc-600 bg-zinc-800 text-zinc-300", rejected: "border-red-500/40 bg-red-500/10 text-red-300", cancelled: "border-zinc-600 bg-zinc-800 text-zinc-300" };

export function StatusBadge({ status }: { status: ReservationStatus }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${styles[status]}`}>{labels[status]}</span>;
}
