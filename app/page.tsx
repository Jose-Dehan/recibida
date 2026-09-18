import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { EventHeader } from "@/components/EventHeader";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { getCurrentPrice } from "@/lib/pricing";

export default async function HomePage() {
  const currentPrice = await getCurrentPrice();

  return (
    <MobilePageContainer className="py-10 sm:py-14">
      <EventHeader />
      <div className="mt-7"><CurrentPriceCard price={currentPrice} /></div>
      <div className="mt-4 space-y-2.5"><PrimaryButton href="/reservar">Comprar entrada</PrimaryButton><SecondaryButton href="/consulta">Consultar mi entrada</SecondaryButton></div>
    </MobilePageContainer>
  );
}
