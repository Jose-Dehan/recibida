"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import type { CreateReservationResponse, ReservationFormValues } from "@/types";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useState } from "react";

const errorMessages: Record<string, string> = {
  ACTIVE_RESERVATION_EXISTS: "Ya existe una reserva activa para este DNI.",
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[24px] border border-line bg-panel p-6 shadow-sheet sm:rounded-[24px]">
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-zinc-600 sm:hidden" />
        <p className="eyebrow">Último paso</p>
        <h2 id="confirmation-title" className="mt-2 text-2xl font-extrabold tracking-tight">Confirmar compra</h2>
        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-[#111114] px-4">
          {[["Nombre", values.name], ["DNI", values.dni], ["Gmail", values.email], ["Género", values.gender], ["Precio", formatPrice(price)]].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3">
              <dt className="text-sm text-zinc-400">{label}</dt><dd className="break-all text-right text-sm font-bold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-6 text-zinc-300">Al confirmar, te informaremos el vencimiento definido para tu reserva.</p>
        {error && <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.07] p-3 text-sm text-red-200" role="alert">{error}</p>}
        <div className="mt-6 space-y-3">
          <PrimaryButton type="button" disabled={submitting} onClick={confirm}>{submitting ? "Creando reserva…" : "Confirmar compra"}</PrimaryButton>
          <SecondaryButton type="button" disabled={submitting} onClick={onClose}>Volver</SecondaryButton>
        </div>
      </section>
    </div>
  );
}
