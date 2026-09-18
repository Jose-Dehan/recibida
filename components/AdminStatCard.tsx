export function AdminStatCard({ label, value }: { label: string; value: string }) {
  return <article className="rounded-[20px] border border-line bg-panel p-4 shadow-card"><p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight">{value}</p></article>;
}
