"use client";

import { useState } from "react";
import type { PublicReservationStatus } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ReservationStatusCard } from "./ReservationStatusCard";

function normalizeStatus(value: unknown): PublicReservationStatus | null {
  const status = String(value ?? "").trim().toLowerCase();
  if (["pending", "pendiente"].includes(status)) return "pending";
  if (["approved", "aprobado", "verified", "verificado"].includes(status)) return "approved";
  if (["rejected", "rechazado"].includes(status)) return "rejected";
  return null;
}

export function ConsultationForm() {
  const [result, setResult] = useState<PublicReservationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(null); setResult(null);
    const form = new FormData(event.currentTarget);
    const dni = String(form.get("dni") ?? "").replace(/\D/g, "");
    const codigo = String(form.get("code") ?? "").trim().toUpperCase();
    if (!/^\d{7,8}$/.test(dni) || !codigo) { setError("Ingresá un DNI y un código de reserva válidos."); setLoading(false); return; }
    try {
      const response = await fetch(`/api/reservations?dni=${encodeURIComponent(dni)}&codigo=${encodeURIComponent(codigo)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || data?.ok === false) {
        const notFound = ["RESERVATION_NOT_FOUND", "NOT_FOUND"].includes(data?.code);
        throw new Error(notFound ? "No encontramos una reserva con ese DNI y código." : data?.error || "No pudimos consultar la reserva.");
      }
      const status = normalizeStatus(data?.reservation?.status ?? data?.status);
      if (!status) throw new Error("El estado recibido no es válido.");
      setResult(status);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Error de red. Intentá nuevamente."); }
    finally { setLoading(false); }
  }
  return (
    <div>
      <form className="space-y-5" onSubmit={submit}>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-zinc-200">DNI</span><input className="field" inputMode="numeric" name="dni" required placeholder="Ingresá tu DNI" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-zinc-200">Código de reserva</span><input className="field uppercase" name="code" required placeholder="Ingresá tu código" /></label>
        <PrimaryButton type="submit" disabled={loading}>{loading ? "Consultando…" : "Consultar"}</PrimaryButton>
      </form>
      {error && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-400/[0.07] p-3 text-sm text-red-200" role="alert">{error}</p>}
      {result && <div className="mt-7"><ReservationStatusCard status={result} /></div>}
    </div>
  );
}
