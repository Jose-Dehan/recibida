import Link from "next/link";

export function BackLink({ href = "/" }: { href?: string }) {
  return <Link href={href} className="inline-flex min-h-12 items-center rounded-lg text-sm font-semibold text-zinc-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-accent">← Volver</Link>;
}
