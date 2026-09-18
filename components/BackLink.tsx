import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href = "/" }: { href?: string }) {
  return <Link href={href} className="group inline-flex min-h-10 items-center gap-2 rounded-xl pr-3 text-sm font-semibold text-zinc-500 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-accent"><ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />Volver</Link>;
}
