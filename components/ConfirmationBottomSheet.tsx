"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import type { CreateReservationResponse, ReservationFormValues } from "@/types";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useState } from "react";

const contactEmail = "recibidaia@gmail.com";

const errorMessages: Record<string, string> = {
  ACTIVE_RESERVATION_EXISTS: "Ya existe una reserva activa para este DNI.",
  REJECTED_RESERVATION_EXISTS: "Este DNI tiene una reserva rechazada. Contactanos a recibidaia@gmail.com.",
  SOLD_OUT: "Las entradas están agotadas.",
  INVALID_DATA: "Revisá los datos ingresados e intentá nuevamente.",
};

export function ConfirmationBottomSheet({ open, values, price, onClose }: { open: boolean; values: ReservationFormValues; price: number; onClose: () => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!open) return null;

  async function confirm() {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genero: values.gender, nombre: values.name.trim(), dni: values.dni, email: values.email }),
      });
      const data = (await response.json()) as CreateReservationResponse;
      const reservation = data.reservation;
      const validReservation = reservation
        && typeof reservation.name === "string" && reservation.name.trim()
        && typeof reservation.dni === "string" && reservation.dni.trim()
        && typeof reservation.code === "string" && reservation.code.trim()
        && Number.isFinite(Number(reservation.price))
        && typeof reservation.expiresAt === "string" && reservation.expiresAt.trim();
      if (!response.ok || !data.ok || !validReservation) {
        throw new Error(errorMessages[data.code ?? ""] ?? data.error ?? "No pudimos crear la reserva.");
      }
      sessionStorage.setItem(`reservation:${reservation.code}`, JSON.stringify(data));
      router.push(`/reserva/${encodeURIComponent(reservation.code)}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Error de red. Intentá nuevamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="relative max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[28px] border border-white/[0.1] bg-[#0a0d0a]/95 p-6 shadow-[0_-24px_80px_rgba(0,0,0,0.65),0_0_45px_rgba(214,243,106,0.06)] backdrop-blur-2xl sm:rounded-[28px]">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-zinc-700 sm:hidden" />
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent/70">Último paso</p>
        <h2 id="confirmation-title" className="mt-2 text-[1.75rem] font-black tracking-[-0.04em]">Confirmar compra</h2>
        <dl className="mt-6 divide-y divide-white/[0.07] rounded-[20px] border border-white/[0.08] bg-white/[0.035] px-4">
          {[["Nombre", values.name], ["DNI", values.dni], ["Gmail", values.email], ["Género", values.gender], ["Precio", formatPrice(price)]].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3">
              <dt className="text-sm text-zinc-400">{label}</dt><dd className="break-all text-right text-sm font-bold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-6 text-zinc-400">Al confirmar, te informaremos el vencimiento definido para tu reserva.</p>
        {error && (
          <p className="mt-4 rounded-[18px] border border-red-400/25 bg-red-400/[0.075] p-3.5 text-sm text-red-200" role="alert">
            {error.includes("recibidaia@gmail.com") ? (
              <>{error.split(contactEmail)[0]}<a className="font-semibold underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a>{error.split(contactEmail)[1]}</>
            ) : error}
          </p>
        )}
        <div className="mt-6 space-y-3">
          <PrimaryButton type="button" disabled={submitting} onClick={confirm}>{submitting ? "Creando reserva…" : "Confirmar compra"}</PrimaryButton>
          <SecondaryButton type="button" disabled={submitting} onClick={onClose}>Volver</SecondaryButton>
        </div>
      </section>
    </div>
  );
}
