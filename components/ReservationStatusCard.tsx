import type { ReservationStatus } from "@/types";
import { StatusBadge } from "./StatusBadge";

const messages: Record<ReservationStatus, string> = {
  pending: "Pago pendiente de validación.",
  verified: "✓ ENTRADA CONFIRMADA",
  expired: "Tu reserva venció.",
  rejected: "El pago no pudo ser validado.",
  cancelled: "La reserva fue cancelada.",
};

export function ReservationStatusCard({ status }: { status: ReservationStatus }) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5" aria-live="polite">
      <StatusBadge status={status} />
      <p className={`mt-4 text-xl font-black ${status === "verified" ? "text-accent" : "text-white"}`}>{messages[status]}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">Código: FIESTA-A7K92 · Juan Pérez</p>
    </section>
  );
}
