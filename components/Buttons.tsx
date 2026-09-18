import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base = "flex w-full items-center justify-center rounded-[20px] px-5 text-center text-[15px] font-extrabold outline-none transition duration-200 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050806] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

export function PrimaryButton({ href, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: ReactNode }) {
  const classes = `${base} min-h-[60px] bg-accent text-[#090b07] shadow-[0_12px_38px_rgba(214,243,106,0.18),0_0_22px_rgba(214,243,106,0.1)] hover:-translate-y-0.5 hover:bg-[#e1fa80] hover:shadow-[0_16px_44px_rgba(214,243,106,0.24)]`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}

export function SecondaryButton({ href, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; children: ReactNode }) {
  const classes = `${base} min-h-14 border border-white/[0.11] bg-white/[0.045] text-zinc-200 backdrop-blur-xl hover:-translate-y-0.5 hover:border-accent/25 hover:bg-accent/[0.055]`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}
