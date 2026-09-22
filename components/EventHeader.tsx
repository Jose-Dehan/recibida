import { CalendarDays, ExternalLink, GlassWater, MapPin } from "lucide-react";
import { EventAddressLink } from "./EventLocationLinks";
import { eventBenefit, eventDate, eventName, venueArea, venueName } from "@/lib/event-data";

export function EventHeader() {
  const [name, suffix] = eventName.split(" ");

  return (
    <header className="relative">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-accent/80">Ingreso por lista</p>
        <span className="flex max-w-full shrink-0 items-center gap-2 rounded-full border border-accent/55 bg-[linear-gradient(135deg,rgba(214,243,106,0.16),rgba(214,243,106,0.06))] px-4 py-2.5 text-[12px] font-black uppercase tracking-[0.18em] text-accent shadow-[0_0_34px_rgba(214,243,106,0.27),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-5 sm:py-3 sm:text-[13px]">
          <GlassWater aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2.1} />
          <span className="whitespace-nowrap">{eventBenefit}</span>
        </span>
      </div>

      <h1 className="mt-5 text-[clamp(3.5rem,17vw,5.25rem)] font-black leading-[0.86] tracking-[-0.075em] text-white">
        {name} <span className="text-accent [text-shadow:0_0_28px_rgba(214,243,106,0.38)]">{suffix}</span>
      </h1>

      <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[15px] font-semibold text-zinc-200">
        <CalendarDays aria-hidden="true" className="h-[18px] w-[18px] text-accent" strokeWidth={1.8} />
        <span>{eventDate}</span>
        <span className="text-zinc-600">•</span>
        <span>{venueName}</span>
      </div>

      <div className="mt-5 flex items-start gap-3 border-l border-accent/30 pl-3.5">
        <MapPin aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-bold text-zinc-200">{venueArea}</p>
          <EventAddressLink className="group mt-1 text-[12px] leading-5 text-zinc-500 hover:text-accent">
            <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </EventAddressLink>
        </div>
      </div>
    </header>
  );
}
