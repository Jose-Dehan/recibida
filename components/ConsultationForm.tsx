"use client";

import { useState } from "react";
import type { ReservationStatus } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ReservationStatusCard } from "./ReservationStatusCard";

const statuses: { value: ReservationStatus; label: string }[] = [
  { value: "pending", label: "Pendiente" }, { value: "verified", label: "Verificado" },
  { value: "expired", label: "Vencido" }, { value: "rejected", label: "Rechazado" },
  { value: "cancelled", label: "Cancelado" },
];

export function ConsultationForm() {
  const [selected, setSelected] = useState<ReservationStatus>("pending");
  const [result, setResult] = useState<ReservationStatus | null>(null);
  return (
    <div>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setResult(selected); }}>
        <label className="block"><span className="mb-2 block text-sm font-bold">DNI</span><input className="field" inputMode="numeric" name="dni" required placeholder="45.123.456" /></label>
        <label className="block"><span className="mb-2 block text-sm font-bold">Código de reserva</span><input className="field uppercase" name="code" required placeholder="FIESTA-A7K92" /></label>
        <PrimaryButton type="submit">Consultar</PrimaryButton>
      </form>
      <fieldset className="mt-7">
        <legend className="eyebrow">Probar estado mock</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {statuses.map(({ value, label }) => <button key={value} type="button" onClick={() => { setSelected(value); setResult(value); }} className={`min-h-12 rounded-xl border px-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-accent ${selected === value ? "border-accent bg-accent text-ink" : "border-line bg-panel text-zinc-300"}`}>{label}</button>)}
        </div>
      </fieldset>
      {result && <div className="mt-7"><ReservationStatusCard status={result} /></div>}
    </div>
  );
}
