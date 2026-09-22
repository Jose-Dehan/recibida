"use client";

import { Clock3 } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { EventInfoCard } from "@/components/EventInfoCard";
import { ExperienceShell } from "@/components/ExperienceShell";
import { ReservationForm } from "@/components/ReservationForm";
import { PrimaryButton } from "@/components/Buttons";
import { usePrice } from "@/lib/use-price";

export default function ReservePage() {
  const { price, loading, error, updatePrice } = usePrice();

  return (
    <ExperienceShell>
      <BackLink />
      <header className="mt-4 sm:mt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent/75">Reserva tu entrada</p>
        <h1 className="mt-2.5 text-[clamp(2.25rem,11.5vw,3.7rem)] font-black leading-[0.98] tracking-[-0.055em] text-white sm:mt-3 sm:leading-[0.95] sm:tracking-[-0.06em]">Comprá tu entrada</h1>
      </header>
      <div className="mt-5 sm:mt-6"><EventInfoCard price={price} /></div>
      {error && <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-400/[0.07] p-3.5 text-sm text-red-200" role="alert">{error}</p>}
      {!loading && !error && price === null ? (
        <section className="mt-5 rounded-[20px] border border-red-300/[0.16] bg-[linear-gradient(135deg,rgba(127,29,29,0.12),rgba(18,18,19,0.94)_48%,rgba(10,11,11,0.98))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:mt-6 sm:rounded-[24px] sm:p-6">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Entradas agotadas</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">Ya se alcanzó la capacidad máxima del evento.</p>
          <div className="mt-6"><PrimaryButton href="/">Volver al inicio</PrimaryButton></div>
        </section>
      ) : <>
      <aside className="mt-4 rounded-[20px] border border-accent/[0.14] bg-accent/[0.045] p-4 backdrop-blur-lg sm:rounded-[22px] sm:p-[18px]">
        <div className="flex items-start gap-3">
          <Clock3 aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.8} />
          <div className="space-y-1.5 text-[13px] leading-5 text-zinc-400">
            <p className="font-bold text-zinc-200">Tenés 2 días para realizar la transferencia.</p>
            <p>El pago se realiza únicamente por transferencia. Después de pagar, subí el comprobante desde la aplicación para su validación.</p>
            <p>Si no recibimos el comprobante dentro de ese plazo, la reserva vence automáticamente.</p>
          </div>
        </div>
      </aside>
      {!loading && !error && price !== null && <div className="mt-6 pb-2 sm:mt-8 sm:pb-5"><ReservationForm price={price} onPriceChange={updatePrice} /></div>}
      </>}
    </ExperienceShell>
  );
}
