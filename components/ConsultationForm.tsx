"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Search } from "lucide-react";
import { normalizeReservationStatus } from "@/lib/reservation-status";
import type { BackendReservation, ReservationLookupReason, ReservationLookupResponse, ReservationStatus } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ReservationStatusCard } from "./ReservationStatusCard";

const lookupFailureContent: Record<ReservationLookupReason, { title: string; description: string }> = {
  CODE_NOT_FOUND: {
    title: "Reserva inexistente",
    description: "No encontramos una reserva con ese código.",
  },
  DNI_MISMATCH: {
    title: "DNI incorrecto",
    description: "El DNI ingresado no coincide con esta reserva.",
  },
};

function isLookupReason(value: unknown): value is ReservationLookupReason {
  return value === "CODE_NOT_FOUND" || value === "DNI_MISMATCH";
}

export function ConsultationForm() {
  const [result, setResult] = useState<{ status: ReservationStatus; reservation: BackendReservation } | null>(null);
  const [lookupFailure, setLookupFailure] = useState<ReservationLookupReason | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(null); setResult(null); setLookupFailure(null);
    const form = new FormData(event.currentTarget);
    const dni = String(form.get("dni") ?? "").replace(/\D/g, "");
    const codigo = String(form.get("code") ?? "").trim().toUpperCase();
    if (!/^\d{8}$/.test(dni) || /^0+$/.test(dni) || !codigo) { setError("Ingresá un DNI de 8 números y un código de reserva válido."); setLoading(false); return; }
    try {
      const response = await fetch(`/api/reservations?dni=${encodeURIComponent(dni)}&codigo=${encodeURIComponent(codigo)}`, { cache: "no-store" });
      const data = (await response.json()) as ReservationLookupResponse;
      if (data.found === false && isLookupReason(data.reason)) {
        setLookupFailure(data.reason);
        return;
      }
      if (!response.ok || data?.ok === false) {
        const legacyNotFound = ["RESERVATION_NOT_FOUND", "NOT_FOUND"].includes(data?.code ?? "");
        if (legacyNotFound) {
          setLookupFailure("CODE_NOT_FOUND");
          return;
        }
        throw new Error("No pudimos consultar la reserva. Intentá nuevamente.");
      }
      const status = normalizeReservationStatus(data?.reservation?.status ?? data?.status);
      if (!status) throw new Error("No pudimos consultar la reserva. Intentá nuevamente.");
      setResult({ status, reservation: { ...data.reservation, code: data.reservation?.code || codigo, dni: data.reservation?.dni || dni, name: data.reservation?.name || "", price: Number(data.reservation?.price) } });
    } catch { setError("No pudimos consultar la reserva. Intentá nuevamente."); }
    finally { setLoading(false); }
  }
  return (
    <div>
      <form className="space-y-5" onSubmit={submit}>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-zinc-200">DNI</span><input className="field" inputMode="numeric" name="dni" pattern="[0-9]{8}" maxLength={8} required placeholder="Ingresá tu DNI" onInput={(event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 8); }} /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-zinc-200">Código de reserva</span><input className="field uppercase" name="code" required placeholder="Ingresá tu código" /></label>
        <PrimaryButton type="submit" disabled={loading}><span className="flex w-full items-center justify-between"><span className="flex items-center gap-2.5"><Search aria-hidden="true" className="h-[18px] w-[18px]" />{loading ? "Consultando…" : "Consultar"}</span><ArrowRight aria-hidden="true" className="h-5 w-5" /></span></PrimaryButton>
      </form>
      {error && <p className="mt-5 rounded-[20px] border border-red-400/25 bg-red-400/[0.075] p-4 text-sm leading-6 text-red-200 shadow-[0_16px_42px_rgba(0,0,0,0.25)] backdrop-blur-xl" role="alert">{error}</p>}
      {lookupFailure && (
        <section className="relative mt-5 overflow-hidden rounded-[24px] border border-red-400/25 bg-[linear-gradient(135deg,rgba(248,113,113,0.1),rgba(255,255,255,0.025))] p-5 text-red-200 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl" role="status">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-300/55 to-transparent" />
          <AlertCircle aria-hidden="true" className="mb-4 h-6 w-6" strokeWidth={1.7} />
          <p className="text-xl font-extrabold tracking-tight">{lookupFailureContent[lookupFailure].title}</p>
          <p className="mt-2 text-sm leading-6 text-red-100/65">{lookupFailureContent[lookupFailure].description}</p>
        </section>
      )}
      {result && <div className="mt-7"><ReservationStatusCard status={result.status} reservation={result.reservation} /></div>}
    </div>
  );
}
