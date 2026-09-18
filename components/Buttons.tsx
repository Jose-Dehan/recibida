import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base = "flex w-full items-center justify-center rounded-[17px] px-5 text-center text-[15px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50";

export function PrimaryButton({ href, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: ReactNode }) {
  const classes = `${base} min-h-14 bg-accent text-ink shadow-[0_10px_28px_rgba(214,243,106,0.08)] hover:bg-[#def77f]`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}

export function SecondaryButton({ href, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: ReactNode }) {
  const classes = `${base} min-h-[50px] border border-line/80 bg-[#111113] text-zinc-200 hover:border-zinc-600 hover:bg-[#17171a]`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}
