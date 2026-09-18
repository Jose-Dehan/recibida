import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { EventHeader } from "@/components/EventHeader";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { currentPrice } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <MobilePageContainer className="flex flex-col justify-center py-12">
      <EventHeader />
      <div className="mt-10"><CurrentPriceCard price={currentPrice} /></div>
      <div className="mt-6 space-y-3"><PrimaryButton href="/reservar">Reservar entrada</PrimaryButton><SecondaryButton href="/consulta">Consultar mi entrada</SecondaryButton></div>
      <p className="mt-7 text-sm leading-6 text-zinc-400">Tu entrada queda reservada durante 5 días.<br />Luego transferí y enviá el comprobante por WhatsApp.</p>
    </MobilePageContainer>
  );
}
