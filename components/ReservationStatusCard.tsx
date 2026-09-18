import type { PublicReservationStatus } from "@/types";

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

export function ReservationStatusCard({ status }: { status: PublicReservationStatus }) {
  const content = statusContent[status];

  return (
    <section className="rounded-2xl border border-line bg-panel p-5" aria-live="polite">
      <p className={`text-xl font-black ${status === "approved" ? "text-accent" : "text-white"}`}>{content.title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{content.description}</p>
    </section>
  );
}
