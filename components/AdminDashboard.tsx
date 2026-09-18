"use client";

import { useMemo, useState } from "react";
import { reservas } from "@/lib/mock-data";
import type { ReservationStatus } from "@/types";
import { MobileReservationCard } from "./MobileReservationCard";

type Filter = "all" | Extract<ReservationStatus, "pending" | "verified" | "expired">;
const filters: { value: Filter; label: string }[] = [{ value: "all", label: "Todos" }, { value: "pending", label: "Pendientes" }, { value: "verified", label: "Verificados" }, { value: "expired", label: "Vencidos" }];

export function AdminDashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => {
    const normalized = query.toLocaleLowerCase("es").trim();
    return reservas.filter((reservation) => (filter === "all" || reservation.status === filter) && (!normalized || `${reservation.name} ${reservation.dni} ${reservation.code}`.toLocaleLowerCase("es").includes(normalized)));
  }, [filter, query]);
  return (
    <section className="mt-8">
      <label className="block"><span className="sr-only">Buscar reservas</span><input className="field" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, DNI o código" /></label>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar reservas">{filters.map(({ value, label }) => <button key={value} type="button" onClick={() => setFilter(value)} className={`min-h-12 rounded-xl border px-4 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-accent ${filter === value ? "border-accent bg-accent text-ink" : "border-line bg-panel text-zinc-300"}`}>{label}</button>)}</div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{visible.map((reservation) => <MobileReservationCard key={reservation.code} reservation={reservation} />)}</div>
      {visible.length === 0 && <p className="mt-8 text-center text-sm text-zinc-400">No hay reservas que coincidan.</p>}
    </section>
  );
}
