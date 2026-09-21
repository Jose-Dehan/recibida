"use client";

import { useEffect, useState } from "react";

type PriceValueState = { price: number | null; loading: boolean; error: string | null };
type PriceState = PriceValueState & { updatePrice: (price: number) => void };

export function usePrice(): PriceState {
  const [state, setState] = useState<PriceValueState>({ price: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/price", { signal: controller.signal, cache: "no-store" });
        const data = await response.json();
        if (!response.ok || data?.ok === false) throw new Error("No pudimos conectar con el servicio de reservas. Intentá nuevamente.");
        const rawPrice = Object.prototype.hasOwnProperty.call(data, "price") ? data.price : data?.data?.price ?? null;
        const price = rawPrice === null ? null : Number(rawPrice);
        if (price !== null && !Number.isFinite(price)) throw new Error("El precio recibido no es válido.");
        setState({ price, loading: false, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ price: null, loading: false, error: error instanceof Error ? error.message : "No pudimos conectar con el servicio de reservas. Intentá nuevamente." });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { ...state, updatePrice: (price) => setState({ price, loading: false, error: null }) };
}
