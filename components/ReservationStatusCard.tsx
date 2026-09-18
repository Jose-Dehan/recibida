import type { PublicReservationStatus } from "@/types";
import { EventLocationCard } from "./EventLocationCard";

const statusContent: Record<PublicReservationStatus, { title: string; description: string }> = {
  pending: {
    title: "Pago pendiente de validación",
    description: "Recibimos tu reserva. Todavía estamos verificando el pago.",
  },
  approved: {
    title: "✓ Entrada confirmada",
    description: "Tu pago fue verificado correctamente.",
  },
  rejected: {
    title: "Pago no validado",
    description: "No pudimos validar el pago. Contactanos si creés que hubo un error.",
  },
};

const statusStyles: Record<PublicReservationStatus, string> = {
  pending: "border-amber-400/20 bg-amber-400/[0.07] text-amber-200",
  approved: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300",
  rejected: "border-red-400/20 bg-red-400/[0.07] text-red-200",
};

export function ReservationStatusCard({ status }: { status: PublicReservationStatus }) {
  const content = statusContent[status];

  return (
    <div aria-live="polite">
      <section className={`rounded-[20px] border p-6 shadow-card ${statusStyles[status]}`}>
        <p className="text-xl font-bold">{content.title}</p>
        <p className="mt-2 text-sm leading-6 text-current opacity-80">{content.description}</p>
      </section>
      {status === "approved" && <div className="mt-4"><EventLocationCard confirmed /></div>}
    </div>
  );
}
