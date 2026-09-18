import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminStatCard } from "@/components/AdminStatCard";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { eventDate, eventName, venueName } from "@/lib/event-data";

const stats = [["Reservas", "400"], ["Verificadas", "312"], ["Pendientes", "58"], ["Recaudado", "$14.850.000"], ["Precio actual", "$50.000"], ["Tanda actual", "Tanda 3"]];

export default function AdminPage() {
  return (
    <MobilePageContainer wide>
      <p className="eyebrow">Panel interno · Demo</p><h1 className="mt-3 text-3xl font-black tracking-tight">Administración</h1><div className="mt-4 flex flex-wrap gap-x-2 text-sm text-zinc-400"><span className="font-semibold text-zinc-200">{eventName}</span><span>·</span><span>{eventDate}</span><span>·</span><span>{venueName}</span></div>
      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Resumen">{stats.map(([label, value]) => <AdminStatCard key={label} label={label} value={value} />)}</section>
      <AdminDashboard />
    </MobilePageContainer>
  );
}
