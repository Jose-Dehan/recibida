"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import type { CreateReservationResponse, ReservationFormValues } from "@/types";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const contactEmail = "recibidaia@gmail.com";
type Outcome = { kind: "price"; price: number } | { kind: "active" } | { kind: "rejected" } | { kind: "soldOut" } | { kind: "error"; message: string } | null;

export function ConfirmationBottomSheet({ open, values, price, onPriceChange, onClose }: { open: boolean; values: ReservationFormValues; price: number; onPriceChange: (price: number) => void; onClose: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);
  if (!open) return null;

  function close() { setOutcome(null); setSubmitting(false); onClose(); }

  async function confirm() {
    setSubmitting(true); setOutcome(null);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genero: values.gender, nombre: values.name.trim(), dni: values.dni, email: values.email, expectedPrice: price }),
      });
      const data = (await response.json()) as CreateReservationResponse;
      if (data.code === "PRICE_CHANGED") {
        const nextPrice = Number(data.price);
        setOutcome(Number.isFinite(nextPrice) ? { kind: "price", price: nextPrice } : { kind: "error", message: "No pudimos actualizar el precio. Intentá nuevamente." }); return;
      }
      if (data.code === "ACTIVE_RESERVATION_EXISTS") { setOutcome({ kind: "active" }); return; }
      if (data.code === "REJECTED_RESERVATION_EXISTS") { setOutcome({ kind: "rejected" }); return; }
      if (data.code === "SOLD_OUT") { setOutcome({ kind: "soldOut" }); return; }
      const reservation = data.reservation;
      const validReservation = reservation && typeof reservation.name === "string" && reservation.name.trim() && typeof reservation.dni === "string" && reservation.dni.trim() && typeof reservation.code === "string" && reservation.code.trim() && Number.isFinite(Number(reservation.price));
      if (!response.ok || !data.ok || !validReservation) { setOutcome({ kind: "error", message: "No pudimos crear la reserva. Intentá nuevamente." }); return; }
      sessionStorage.setItem(`reservation:${reservation.code}`, JSON.stringify(data));
      router.push(`/reserva/${encodeURIComponent(reservation.code)}`);
    } catch { setOutcome({ kind: "error", message: "No pudimos conectar con el servicio de reservas. Intentá nuevamente." }); }
    finally { setSubmitting(false); }
  }

  const special = outcome && outcome.kind !== "error";
  const title = outcome?.kind === "price" ? "El precio cambió" : outcome?.kind === "active" ? "Ya tenés una reserva activa" : outcome?.kind === "rejected" ? "Este DNI tiene una reserva rechazada" : outcome?.kind === "soldOut" ? "Entradas agotadas" : null;
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" onMouseDown={(e) => { if (e.target === e.currentTarget && !submitting) close(); }}>
    <section className="relative max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[28px] border border-white/[0.1] bg-[#0a0d0a]/95 p-6 shadow-[0_-24px_80px_rgba(0,0,0,0.65),0_0_45px_rgba(214,243,106,0.06)] backdrop-blur-2xl sm:rounded-[28px]">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" /><div className="mx-auto mb-5 h-1 w-12 rounded-full bg-zinc-700 sm:hidden" />
      {special ? <div aria-live="polite">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent/70">Reserva</p><h2 id="confirmation-title" className="mt-2 text-[1.75rem] font-black tracking-[-0.04em]">{title}</h2>
        {outcome.kind === "price" && <><p className="mt-4 text-sm leading-6 text-zinc-300">La tanda anterior se agotó mientras realizabas la reserva.</p><p className="mt-5 rounded-[20px] border border-accent/20 bg-accent/[0.07] p-4 text-center text-xl font-black text-accent">Nuevo precio: {formatPrice(outcome.price)}</p></>}
        {outcome.kind === "active" && <p className="mt-4 text-sm leading-6 text-zinc-300">Ya existe una reserva pendiente o aprobada asociada a este DNI.</p>}
        {outcome.kind === "rejected" && <p className="mt-4 text-sm leading-6 text-zinc-300">No se te permite generar una nueva compra.<br /><br />Si creés que hubo un error, escribinos a <a className="font-semibold text-accent underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>}
        {outcome.kind === "soldOut" && <p className="mt-4 text-sm leading-6 text-zinc-300">Ya se alcanzó la capacidad máxima del evento.</p>}
        <div className="mt-6 space-y-3">{outcome.kind === "price" && <PrimaryButton type="button" onClick={() => { onPriceChange(outcome.price); close(); }}>Actualizar precio</PrimaryButton>}{outcome.kind === "active" && <PrimaryButton href="/consulta">Consultar mi entrada</PrimaryButton>}<SecondaryButton type="button" onClick={close}>Cerrar</SecondaryButton></div>
      </div> : <>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent/70">Último paso</p><h2 id="confirmation-title" className="mt-2 text-[1.75rem] font-black tracking-[-0.04em]">Confirmar compra</h2>
        <dl className="mt-6 divide-y divide-white/[0.07] rounded-[20px] border border-white/[0.08] bg-white/[0.035] px-4">{[["Nombre", values.name], ["DNI", values.dni], ["Gmail", values.email], ["Género", values.gender], ["Precio", formatPrice(price)]].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 py-3"><dt className="text-sm text-zinc-400">{label}</dt><dd className="break-all text-right text-sm font-bold">{value}</dd></div>)}</dl>
        <p className="mt-5 text-sm leading-6 text-zinc-400">Al confirmar, te informaremos el vencimiento definido para tu reserva.</p>{outcome?.kind === "error" && <p className="mt-4 rounded-[18px] border border-red-400/25 bg-red-400/[0.075] p-3.5 text-sm text-red-200" role="alert">{outcome.message}</p>}
        <div className="mt-6 space-y-3"><PrimaryButton type="button" disabled={submitting} onClick={confirm}>{submitting ? "Creando reserva…" : "Confirmar compra"}</PrimaryButton><SecondaryButton type="button" disabled={submitting} onClick={close}>Volver</SecondaryButton></div>
      </>}
    </section>
  </div>;
}
