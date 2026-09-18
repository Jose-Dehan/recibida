import { BackLink } from "@/components/BackLink";
import { CurrentPriceCard } from "@/components/CurrentPriceCard";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { ReservationForm } from "@/components/ReservationForm";
import { currentPrice } from "@/lib/mock-data";

export default function ReservePage() {
  return <MobilePageContainer><BackLink /><h1 className="mt-5 text-3xl font-black tracking-tight">Reservá tu entrada</h1><div className="mt-7"><CurrentPriceCard price={currentPrice} compact /></div><p className="mt-5 text-sm text-zinc-400">Cada reserva corresponde a una entrada.</p><div className="mt-7"><ReservationForm price={currentPrice} /></div></MobilePageContainer>;
}
