import Link from "next/link";
import { CircleCheck, CircleX, Clock3, TriangleAlert } from "lucide-react";
import { whatsappNumber } from "@/lib/event-data";
import { formatPrice } from "@/lib/format";
import type { BackendReservation, ReservationStatus } from "@/types";
import { EventLocationCard } from "./EventLocationCard";
import { PaymentDetailsCard } from "./PaymentDetailsCard";
import { ReservationSummaryCard } from "./ReservationSummaryCard";

const content: Record<ReservationStatus, { title: string; description: string; style: string; glow: string }> = {
  Pendiente: { title: "Pendiente", description: "Recibimos tu reserva. Todavía falta validar el comprobante de pago.", style: "border-amber-400/20 bg-amber-400/[0.07] text-amber-200", glow: "via-amber-300/55" },
  Aprobado: { title: "Entrada confirmada", description: "Tu pago fue verificado y tu entrada está confirmada.", style: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300", glow: "via-emerald-300/60" },
  Rechazado: { title: "Reserva rechazada", description: "Esta reserva fue rechazada y no permite generar una nueva compra con el mismo DNI.", style: "border-red-400/20 bg-red-400/[0.07] text-red-200", glow: "via-red-300/55" },
  Vencido: { title: "Reserva vencida", description: "El plazo de pago de esta reserva venció. Podés volver a comprar una entrada.", style: "border-amber-400/25 bg-amber-400/[0.07] text-amber-200", glow: "via-amber-300/55" },
};

export function ReservationStatusCard({ status, reservation }: { status: ReservationStatus; reservation: BackendReservation }) {
  const item = content[status];
  const Icon = status === "Aprobado" ? CircleCheck : status === "Pendiente" ? Clock3 : status === "Vencido" ? TriangleAlert : CircleX;
  const complete = reservation.name && reservation.code && Number.isFinite(Number(reservation.price));
  const message = `Hola, envío el comprobante de mi entrada.\n\nNombre: ${reservation.name}\nDNI: ${reservation.dni}\nCódigo de reserva: ${reservation.code}\nPrecio reservado: ${formatPrice(Number(reservation.price))}\n\nAdjunto el comprobante de transferencia.`;
  return <div aria-live="polite">
    <section className={`relative overflow-hidden rounded-[24px] border bg-gradient-to-br from-current/[0.08] to-white/[0.025] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl ${item.style}`}>
      <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${item.glow} to-transparent`} /><Icon aria-hidden="true" className="mb-4 h-6 w-6" strokeWidth={1.7} />
      <p className="text-xl font-extrabold tracking-tight">{item.title}</p><p className="mt-2 text-sm leading-6 text-current opacity-65">{item.description}</p>
      {(status === "Rechazado" || status === "Vencido") && <p className="mt-3 text-sm leading-6 text-current opacity-75">{status === "Rechazado" ? "Si creés que hubo un error, escribinos a " : "Si necesitás ayuda, escribinos a "}<a className="font-semibold underline underline-offset-2" href="mailto:recibidaia@gmail.com">recibidaia@gmail.com</a></p>}
    </section>
    {status === "Pendiente" && complete && <div className="mt-4 space-y-4"><ReservationSummaryCard reservation={{ name: reservation.name, code: reservation.code, price: Number(reservation.price), expiresAt: reservation.expiresAt }} /><PaymentDetailsCard /><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="flex min-h-[58px] items-center justify-center rounded-[20px] bg-accent px-5 text-center text-[15px] font-extrabold text-[#090b07]">Enviar comprobante por WhatsApp</a></div>}
    {status === "Aprobado" && <div className="mt-4 space-y-4">{reservation.code && <p className="glass-card p-5 text-sm text-zinc-400">Código de reserva <strong className="mt-2 block break-all font-mono text-xl tracking-wider text-accent">{reservation.code}</strong></p>}<EventLocationCard confirmed /></div>}
    {status === "Vencido" && <Link href="/reservar" className="mt-4 flex min-h-[58px] items-center justify-center rounded-[20px] bg-accent px-5 text-center text-[15px] font-extrabold text-[#090b07]">Comprar otra entrada</Link>}
  </div>;
}
