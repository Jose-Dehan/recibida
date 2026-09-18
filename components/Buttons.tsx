import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base = "flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-center text-sm font-extrabold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50";

export function PrimaryButton({ href, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: ReactNode }) {
  const classes = `${base} bg-accent text-ink hover:bg-accent/90`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}

export function SecondaryButton({ href, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: ReactNode }) {
  const classes = `${base} border border-line bg-panel text-white hover:border-zinc-500`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}
