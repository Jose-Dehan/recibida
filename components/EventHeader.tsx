import { eventDate, eventName, location } from "@/lib/mock-data";

export function EventHeader() {
  return (
    <header>
      <p className="eyebrow">Entradas 2026</p>
      <h1 className="mt-3 text-4xl font-black leading-none tracking-tight">{eventName}</h1>
      <p className="mt-4 text-base text-zinc-400">{location} · {eventDate}</p>
    </header>
  );
}
