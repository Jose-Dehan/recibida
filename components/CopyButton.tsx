"use client";

import { useState } from "react";

export function CopyButton({ value, label, copiedLabel = "Copiado ✓" }: { value: string; label: string; copiedLabel?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Copy command failed");
      }
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2500);
    }
  }

  const text = status === "copied" ? copiedLabel : status === "error" ? "No se pudo copiar" : label;
  return <button type="button" onClick={copy} className="min-h-11 rounded-xl border border-line/80 bg-[#101013] px-3.5 text-xs font-semibold text-zinc-400 outline-none transition-colors hover:border-zinc-600 hover:text-white focus-visible:ring-2 focus-visible:ring-accent" aria-live="polite">{text}</button>;
}
