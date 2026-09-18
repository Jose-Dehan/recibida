"use client";

import { BackLink } from "@/components/BackLink";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { ReservationForm } from "@/components/ReservationForm";
import { usePrice } from "@/lib/use-price";
import { eventDate, venueArea, venueName } from "@/lib/event-data";

export default function ReservePage() {
  const { price, loading, error } = usePrice();

  return <MobilePageContainer><BackLink /><h1 className="mt-5 text-[2rem] font-extrabold tracking-[-0.035em]">Comprá tu entrada</h1><div className="mt-7"><CurrentPriceCard price={price} compact loading={loading} error={error} /></div>{error && <p className="mt-3 text-sm text-red-300" role="alert">{error}</p>}<div className="mt-4 px-1 text-sm leading-6"><p className="font-semibold text-zinc-200">{eventDate}</p><p className="text-zinc-500">{venueName} · {venueArea}</p></div><aside className="mt-5 rounded-[20px] border border-accent/15 bg-accent/[0.055] p-5"><p className="font-bold text-zinc-100">El plazo de pago se informará al reservar</p><p className="mt-2 text-sm leading-6 text-zinc-400">Realizá la transferencia y enviá el comprobante antes del vencimiento indicado en tu reserva.</p></aside>{!loading && !error && price !== null && <div className="mt-8"><ReservationForm price={price} /></div>}</MobilePageContainer>;
}
