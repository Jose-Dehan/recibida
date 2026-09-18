"use client";

import { useState } from "react";
import type { PublicReservationStatus } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ReservationStatusCard } from "./ReservationStatusCard";

const mockStatus: PublicReservationStatus = "pending";

export function ConsultationForm() {
  const [result, setResult] = useState<PublicReservationStatus | null>(null);
  return (
    <div>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setResult(mockStatus); }}>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-zinc-200">DNI</span><input className="field" inputMode="numeric" name="dni" required placeholder="45.123.456" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-zinc-200">Código de reserva</span><input className="field uppercase" name="code" required placeholder="FIESTA-A7K92" /></label>
        <PrimaryButton type="submit">Consultar</PrimaryButton>
      </form>
      {result && <div className="mt-7"><ReservationStatusCard status={result} /></div>}
    </div>
  );
}
