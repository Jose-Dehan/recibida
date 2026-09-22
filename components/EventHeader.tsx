import { CalendarDays, ExternalLink, GlassWater, MapPin } from "lucide-react";
import { EventAddressLink } from "./EventLocationLinks";
import { eventBenefit, eventDate, eventName, venueArea, venueName } from "@/lib/event-data";

export function EventHeader() {
  const [name, suffix] = eventName.split(" ");

  return (
    <header className="relative">
      <div className="flex items-center justify-between gap-2.5 sm:gap-4">
        <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-accent/80 min-[375px]:text-[10px] min-[375px]:tracking-[0.22em] sm:text-[11px] sm:tracking-[0.26em]">Ingreso por lista</p>
        <span className="flex max-w-full shrink-0 items-center gap-1.5 rounded-full border border-accent/55 bg-[linear-gradient(135deg,rgba(214,243,106,0.16),rgba(214,243,106,0.06))] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-accent shadow-[0_0_26px_rgba(214,243,106,0.23),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl min-[390px]:px-3.5 min-[390px]:text-[11px] sm:gap-2 sm:px-5 sm:py-3 sm:text-[13px] sm:tracking-[0.18em]">
          <GlassWater aria-hidden="true" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.1} />
          <span className="whitespace-nowrap">{eventBenefit}</span>
        </span>
      </div>

      <h1 className="mt-4 whitespace-nowrap text-[clamp(3.05rem,15.5vw,5.25rem)] font-black leading-[0.9] tracking-[-0.07em] text-white sm:mt-5 sm:leading-[0.86] sm:tracking-[-0.075em]">
        {name} <span className="text-accent [text-shadow:0_0_28px_rgba(214,243,106,0.38)]">{suffix}</span>
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[14px] font-semibold text-zinc-200 sm:mt-7 sm:gap-x-2.5 sm:text-[15px]">
        <CalendarDays aria-hidden="true" className="h-4 w-4 text-accent sm:h-[18px] sm:w-[18px]" strokeWidth={1.8} />
        <span>{eventDate}</span>
        <span className="text-zinc-600">•</span>
        <span>{venueName}</span>
      </div>

      <div className="mt-3.5 flex items-start gap-2.5 border-l border-accent/30 pl-3 sm:mt-5 sm:gap-3 sm:pl-3.5">
        <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:h-[18px] sm:w-[18px]" strokeWidth={1.8} />
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-zinc-200 sm:text-sm">{venueArea}</p>
          <EventAddressLink className="group mt-0.5 text-[11px] leading-[1.1rem] text-zinc-500 hover:text-accent sm:mt-1 sm:text-[12px] sm:leading-5">
            <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </EventAddressLink>
        </div>
      </div>
    </header>
  );
}
