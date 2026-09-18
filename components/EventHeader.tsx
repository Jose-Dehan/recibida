import { EventAddressLink } from "./EventLocationLinks";
import { eventDate, eventName, venueArea, venueName } from "@/lib/event-data";

export function EventHeader() {
  return (
    <header>
      <p className="eyebrow">Entradas 2026</p>
      <h1 className="mt-3 text-[2.35rem] font-extrabold leading-none tracking-[-0.045em]">{eventName}</h1>
      <p className="mt-4 text-[15px] text-zinc-300"><span className="font-medium text-white">{eventDate}</span><span className="mx-2 text-zinc-700">·</span><span className="font-semibold">{venueName}</span></p>
      <p className="mt-1.5 text-sm text-zinc-500">{venueArea}</p>
      <p className="mt-3 text-[13px] leading-5 text-zinc-500"><EventAddressLink showIcon /></p>
    </header>
  );
}
