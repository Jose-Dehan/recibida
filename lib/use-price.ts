"use client";

import { useEffect, useState } from "react";

type PriceValueState = {
  price: number | null;
  tierIndex: number | null;
  tierLabel: string | null;
  remainingInTier: number | null;
  nextTierPrice: number | null;
  soldOut: boolean;
  loading: boolean;
  error: string | null;
};
type PriceState = PriceValueState & { updatePrice: (price: number) => void };

const emptyPriceMetadata = {
  tierIndex: null,
  tierLabel: null,
  remainingInTier: null,
  nextTierPrice: null,
  soldOut: false,
} as const;

export function usePrice(): PriceState {
  const [state, setState] = useState<PriceValueState>({ price: null, ...emptyPriceMetadata, loading: true, error: null });

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
        const tierIndex = Number.isInteger(Number(data.tierIndex)) ? Number(data.tierIndex) : null;
        const tierLabel = typeof data.tierLabel === "string" ? data.tierLabel : null;
        const parsedRemaining = data.remainingInTier === null ? null : Number(data.remainingInTier);
        const remainingInTier = parsedRemaining !== null && Number.isFinite(parsedRemaining) ? parsedRemaining : null;
        const parsedNextPrice = data.nextTierPrice === null ? null : Number(data.nextTierPrice);
        const nextTierPrice = parsedNextPrice !== null && Number.isFinite(parsedNextPrice) ? parsedNextPrice : null;
        const soldOut = data.soldOut === true;
        setState({ price, tierIndex, tierLabel, remainingInTier, nextTierPrice, soldOut, loading: false, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ price: null, ...emptyPriceMetadata, loading: false, error: error instanceof Error ? error.message : "No pudimos conectar con el servicio de reservas. Intentá nuevamente." });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { ...state, updatePrice: (price) => setState({ price, ...emptyPriceMetadata, loading: false, error: null }) };
}
