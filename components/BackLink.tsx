import Link from "next/link";

export function BackLink({ href = "/" }: { href?: string }) {
  return <Link href={href} className="inline-flex min-h-12 items-center text-sm font-bold text-zinc-300 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent">← Volver</Link>;
}
