import { BackLink } from "@/components/BackLink";
import { ConsultationForm } from "@/components/ConsultationForm";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { eventDate, eventName, venueArea, venueName } from "@/lib/event-data";

export default function ConsultationPage() {
  return <MobilePageContainer><BackLink /><h1 className="mt-5 text-[2rem] font-extrabold tracking-[-0.035em]">Consultar mi entrada</h1><div className="mt-6 border-l-2 border-accent/50 pl-4"><p className="font-semibold text-zinc-100">{eventName}</p><p className="mt-1 text-sm text-zinc-400">{eventDate}</p><p className="mt-1 text-sm text-zinc-500">{venueName} · {venueArea}</p></div><div className="mt-8"><ConsultationForm /></div></MobilePageContainer>;
}
