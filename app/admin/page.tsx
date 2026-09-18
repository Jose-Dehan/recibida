import { AdminDashboard } from "@/components/AdminDashboard";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { eventDate, eventName, venueName } from "@/lib/event-data";

export default function AdminPage() {
  return (
    <MobilePageContainer wide>
      <p className="eyebrow">Panel interno</p><h1 className="mt-3 text-3xl font-black tracking-tight">Administración</h1><div className="mt-4 flex flex-wrap gap-x-2 text-sm text-zinc-400"><span className="font-semibold text-zinc-200">{eventName}</span><span>·</span><span>{eventDate}</span><span>·</span><span>{venueName}</span></div>
      <AdminDashboard />
    </MobilePageContainer>
  );
}
