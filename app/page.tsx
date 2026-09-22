"use client";

import Link from "next/link";
import { ArrowRight, Info, Search, Ticket } from "lucide-react";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { EventHeader } from "@/components/EventHeader";
import { ExperienceShell } from "@/components/ExperienceShell";
import { usePrice } from "@/lib/use-price";

export default function HomePage() {
  const { price, tierLabel, remainingInTier, nextTierPrice, soldOut, loading, error } = usePrice();

  return (
    <ExperienceShell centered>
        <EventHeader />

        <div className="mt-6 sm:mt-8"><CurrentPriceCard price={price} tierLabel={tierLabel} remainingInTier={remainingInTier} nextTierPrice={nextTierPrice} soldOut={soldOut} featured loading={loading} error={error} /></div>
        {error && <p className="mt-3 text-sm text-red-300" role="alert">{error}</p>}

        <div className="mt-4 space-y-3 sm:mt-5">
          {!loading && !soldOut && price !== null && (
            <Link href="/reservar" className="group flex min-h-[58px] w-full items-center justify-between rounded-[18px] bg-accent px-4 text-[15px] font-extrabold text-[#090b07] shadow-[0_12px_42px_rgba(214,243,106,0.2),0_0_25px_rgba(214,243,106,0.13)] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#e1fa80] hover:shadow-[0_16px_50px_rgba(214,243,106,0.27),0_0_32px_rgba(214,243,106,0.18)] active:translate-y-0 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-[64px] sm:rounded-[20px] sm:px-5 sm:text-[16px]">
              <span className="flex items-center gap-3"><Ticket aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />Comprar entrada</span>
              <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.2} />
            </Link>
          )}
          {!loading && !error && (soldOut || price === null) && (
            <button type="button" disabled className="flex min-h-[64px] w-full cursor-not-allowed items-center justify-center rounded-[20px] border border-white/[0.08] bg-white/[0.035] px-5 text-[16px] font-extrabold text-zinc-500" aria-label="Entradas agotadas">
              Entradas agotadas
            </button>
          )}
          <Link href="/consulta" className="group flex min-h-[56px] w-full items-center justify-between rounded-[18px] border border-white/[0.11] bg-white/[0.045] px-4 text-[14px] font-bold text-zinc-100 shadow-[0_14px_35px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)] outline-none backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-accent/[0.055] hover:shadow-[0_14px_38px_rgba(0,0,0,0.3),0_0_25px_rgba(214,243,106,0.06)] active:translate-y-0 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-[60px] sm:rounded-[20px] sm:px-5 sm:text-[15px]">
            <span className="flex items-center gap-3"><Search aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2} />Consultar mi entrada</span>
            <ArrowRight aria-hidden="true" className="h-5 w-5 text-zinc-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent" strokeWidth={2} />
          </Link>
        </div>

        <aside className="mt-3 flex items-start gap-2.5 rounded-[16px] border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-[11px] leading-[1.15rem] text-zinc-400 sm:mt-4 sm:gap-3 sm:rounded-[18px] sm:px-4 sm:py-3.5 sm:text-[12px] sm:leading-5">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" strokeWidth={1.8} />
          <p>
            ¿Ya realizaste el pago y no subiste el comprobante?<br />
            Podés hacerlo desde <Link href="/consulta" className="font-bold text-accent transition hover:text-[#e1fa80]">Consultar mi entrada</Link>.
          </p>
        </aside>
    </ExperienceShell>
  );
}
