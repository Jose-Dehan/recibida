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

  return <button type="button" onClick={copy} className="min-h-12 rounded-xl border border-line bg-zinc-900 px-4 text-xs font-extrabold uppercase tracking-wide outline-none hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-accent" aria-live="polite">{copied ? "Copiado" : label}</button>;
}
