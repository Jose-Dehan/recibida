import { BackLink } from "@/components/BackLink";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { ReservationForm } from "@/components/ReservationForm";
import { getCurrentPrice } from "@/lib/pricing";
import { eventDate, venueArea, venueName } from "@/lib/event-data";

export default async function ReservePage() {
  const currentPrice = await getCurrentPrice();

  return <MobilePageContainer><BackLink /><h1 className="mt-5 text-[2rem] font-extrabold tracking-[-0.035em]">Comprá tu entrada</h1><div className="mt-7"><CurrentPriceCard price={currentPrice} compact /></div><div className="mt-4 px-1 text-sm leading-6"><p className="font-semibold text-zinc-200">{eventDate}</p><p className="text-zinc-500">{venueName} · {venueArea}</p></div><aside className="mt-5 rounded-[20px] border border-accent/15 bg-accent/[0.055] p-5"><p className="font-bold text-zinc-100">Tenés 5 días para completar el pago</p><p className="mt-2 text-sm leading-6 text-zinc-400">Realizá la transferencia y enviá el comprobante dentro de ese plazo. Si no lo recibimos, la compra se cancela automáticamente.</p></aside><div className="mt-8"><ReservationForm price={currentPrice} /></div></MobilePageContainer>;
}
