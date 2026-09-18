import { eventBenefit, eventDate, eventName, venueArea, venueName } from "@/lib/event-data";
import { EventAddressLink, MapsButtonLink } from "./EventLocationLinks";

export function EventLocationCard({ confirmed = false }: { confirmed?: boolean }) {
  return (
    <section className="glass-card relative overflow-hidden p-5">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <p className="eyebrow">{confirmed ? "Entrada confirmada" : "Ubicación del evento"}</p>
      {confirmed && (
        <div className="mt-4">
          <p className="text-lg font-bold text-white">{eventName}</p>
          <p className="mt-1 text-sm text-zinc-400">{eventDate}</p>
          <p className="mt-1 text-sm font-semibold text-zinc-300">{eventBenefit}</p>
        </div>
      )}
      <div className={`${confirmed ? "mt-5 border-t border-white/[0.08] pt-5" : "mt-4"}`}>
        <p className="font-semibold text-white">{venueName}</p>
        {!confirmed && <p className="mt-1 text-sm text-zinc-400">{venueArea}</p>}
        <p className="mt-2 text-sm leading-6 text-zinc-400"><EventAddressLink /></p>
        {!confirmed && <p className="mt-1 text-sm text-zinc-500">{eventDate}</p>}
      </div>
      <div className="mt-5"><MapsButtonLink /></div>
    </section>
  );
}
