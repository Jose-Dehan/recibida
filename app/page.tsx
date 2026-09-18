"use client";

import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { EventHeader } from "@/components/EventHeader";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { usePrice } from "@/lib/use-price";

export default function HomePage() {
  const { price, loading, error } = usePrice();

  return (
    <MobilePageContainer className="py-10 sm:py-14">
      <EventHeader />
      <div className="mt-7"><CurrentPriceCard price={price} loading={loading} error={error} /></div>
      {error && <p className="mt-3 text-sm text-red-300" role="alert">{error}</p>}
      <div className="mt-4 space-y-2.5">{!loading && price !== null && <PrimaryButton href="/reservar">Comprar entrada</PrimaryButton>}<SecondaryButton href="/consulta">Consultar mi entrada</SecondaryButton></div>
    </MobilePageContainer>
  );
}
