"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return <button type="button" onClick={copy} className="min-h-10 rounded-xl border border-line/80 bg-[#101013] px-3.5 text-xs font-semibold text-zinc-400 outline-none transition-colors hover:border-zinc-600 hover:text-white focus-visible:ring-2 focus-visible:ring-accent" aria-live="polite">{copied ? "Copiado" : label}</button>;
}
