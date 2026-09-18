import { mapsUrl, venueAddress } from "@/lib/event-data";

const focusStyles = "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function EventAddressLink({ className = "", showIcon = false }: { className?: string; showIcon?: boolean }) {
  return (
    <a href={mapsUrl} target="_blank" rel="noreferrer" className={`${focusStyles} inline-flex items-start gap-1.5 transition-colors hover:text-white ${className}`} aria-label={`${venueAddress}. Abrir en Google Maps`}>
      {showIcon && <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0"><path d="M15.5 8.25c0 4-5.5 8.25-5.5 8.25S4.5 12.25 4.5 8.25a5.5 5.5 0 1 1 11 0Z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="8.25" r="1.75" stroke="currentColor" strokeWidth="1.4"/></svg>}
      <span>{venueAddress}</span>
    </a>
  );
}

export function MapsButtonLink() {
  return (
    <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex min-h-[50px] w-full items-center justify-center rounded-2xl border border-line/80 bg-[#101013] px-5 text-center text-sm font-semibold text-zinc-200 outline-none transition-colors hover:border-zinc-600 hover:bg-panel focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
      Ver en Google Maps
    </a>
  );
}
