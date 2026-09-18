"use client";

import { Clock3 } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { EventInfoCard } from "@/components/EventInfoCard";
import { ExperienceShell } from "@/components/ExperienceShell";
import { ReservationForm } from "@/components/ReservationForm";
import { usePrice } from "@/lib/use-price";

export default function ReservePage() {
  const { price, loading, error, updatePrice } = usePrice();

  return (
    <ExperienceShell>
      <BackLink />
      <header className="mt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent/75">Reserva tu entrada</p>
        <h1 className="mt-3 text-[clamp(2.65rem,13vw,3.7rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">Comprá tu entrada</h1>
      </header>
      <div className="mt-6"><EventInfoCard price={price} /></div>
      {error && <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-400/[0.07] p-3.5 text-sm text-red-200" role="alert">{error}</p>}
      <aside className="mt-4 rounded-[22px] border border-accent/[0.14] bg-accent/[0.045] p-[18px] backdrop-blur-lg">
        <div className="flex items-start gap-3">
          <Clock3 aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.8} />
          <div className="space-y-1.5 text-[13px] leading-5 text-zinc-400">
            <p className="font-bold text-zinc-200">Tu entrada queda reservada durante 5 días.</p>
            <p>Tenés 5 días para realizar la transferencia y enviar el comprobante.</p>
            <p>Si no recibimos el comprobante dentro de ese plazo, la compra se cancela automáticamente.</p>
          </div>
        </div>
      </aside>
      {!loading && !error && price !== null && <div className="mt-8 pb-5"><ReservationForm price={price} onPriceChange={updatePrice} /></div>}
    </ExperienceShell>
  );
}
