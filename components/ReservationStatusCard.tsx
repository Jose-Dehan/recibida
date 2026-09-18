import { CircleCheck, CircleX, Clock3, TriangleAlert } from "lucide-react";
import type { PublicReservationStatus } from "@/types";
import { EventLocationCard } from "./EventLocationCard";

const statusContent: Record<PublicReservationStatus, { title: string; description: string }> = {
  pending: {
    title: "Pendiente",
    description: "Recibimos tu reserva. Todavía estamos verificando el pago.",
  },
  approved: {
    title: "Entrada confirmada",
    description: "Tu pago fue verificado correctamente.",
  },
  rejected: {
    title: "Reserva rechazada",
    description: "Esta reserva fue rechazada y no permite generar una nueva compra con el mismo DNI.",
  },
  expired: {
    title: "Reserva vencida",
    description: "El plazo de pago de esta reserva venció. Podés volver a comprar una entrada.",
  },
};

const statusStyles: Record<PublicReservationStatus, string> = {
  pending: "border-amber-400/20 bg-amber-400/[0.07] text-amber-200",
  approved: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300",
  rejected: "border-red-400/20 bg-red-400/[0.07] text-red-200",
  expired: "border-amber-400/25 bg-amber-400/[0.07] text-amber-200",
};

const statusGlow: Record<PublicReservationStatus, string> = {
  pending: "via-amber-300/55",
  approved: "via-emerald-300/60",
  rejected: "via-red-300/55",
  expired: "via-amber-300/55",
};

export function ReservationStatusCard({ status }: { status: PublicReservationStatus }) {
  const content = statusContent[status];
  const StatusIcon = status === "approved" ? CircleCheck : status === "pending" ? Clock3 : status === "expired" ? TriangleAlert : CircleX;

  return (
    <div aria-live="polite">
      <section className={`relative overflow-hidden rounded-[24px] border bg-gradient-to-br from-current/[0.08] to-white/[0.025] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl ${statusStyles[status]}`}>
        <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${statusGlow[status]} to-transparent`} />
        <StatusIcon aria-hidden="true" className="mb-4 h-6 w-6" strokeWidth={1.7} />
        <p className="text-xl font-extrabold tracking-tight">{content.title}</p>
        <p className="mt-2 text-sm leading-6 text-current opacity-65">{content.description}</p>
        {(status === "rejected" || status === "expired") && (
          <p className="mt-3 text-sm leading-6 text-current opacity-75">
            {status === "rejected" ? "Si creés que hubo un error, escribinos a " : "Si necesitás ayuda, escribinos a "}
            <a className="font-semibold underline underline-offset-2" href="mailto:recibidaia@gmail.com">recibidaia@gmail.com</a>
          </p>
        )}
      </section>
      {status === "approved" && <div className="mt-4"><EventLocationCard confirmed /></div>}
    </div>
  );
}
