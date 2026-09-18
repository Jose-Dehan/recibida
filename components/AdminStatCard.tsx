export function AdminStatCard({ label, value }: { label: string; value: string }) {
  return <article className="rounded-2xl border border-line bg-panel p-4"><p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></article>;
}
