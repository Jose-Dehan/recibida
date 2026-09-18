"use client";

import { useEffect, useState } from "react";

type PriceState = { price: number | null; loading: boolean; error: string | null };

export function usePrice(): PriceState {
  const [state, setState] = useState<PriceState>({ price: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/price", { signal: controller.signal, cache: "no-store" });
        const data = await response.json();
        if (!response.ok || data?.ok === false) throw new Error(data?.error || "No pudimos obtener el precio.");
        const rawPrice = data?.price ?? data?.data?.price ?? null;
        const price = rawPrice === null ? null : Number(rawPrice);
        if (price !== null && !Number.isFinite(price)) throw new Error("El precio recibido no es válido.");
        setState({ price, loading: false, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ price: null, loading: false, error: error instanceof Error ? error.message : "Error de red." });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return state;
}
