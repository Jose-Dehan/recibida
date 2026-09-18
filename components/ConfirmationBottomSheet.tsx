"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { mockReservationCode } from "@/lib/mock-data";
import type { ReservationFormValues } from "@/types";
import { PrimaryButton, SecondaryButton } from "./Buttons";

export function ConfirmationBottomSheet({ open, values, price, onClose }: { open: boolean; values: ReservationFormValues; price: number; onClose: () => void }) {
  const router = useRouter();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[24px] border border-line bg-panel p-6 shadow-sheet sm:rounded-[24px]">
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-zinc-600 sm:hidden" />
        <p className="eyebrow">Último paso</p>
        <h2 id="confirmation-title" className="mt-2 text-2xl font-extrabold tracking-tight">Confirmar compra</h2>
        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-[#111114] px-4">
          {[["Nombre", values.name], ["DNI", values.dni], ["Email", values.email], ["Género", values.gender], ["Precio", formatPrice(price)]].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3">
              <dt className="text-sm text-zinc-400">{label}</dt><dd className="break-all text-right text-sm font-bold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 space-y-2 text-sm leading-6 text-zinc-300">
          <p>Tu entrada quedará reservada durante 5 días.</p>
          <p>Tenés hasta el <strong className="text-white">22/09/2026</strong> para realizar la transferencia y enviar el comprobante.</p>
        </div>
        <div className="mt-6 space-y-3">
          <PrimaryButton type="button" onClick={() => router.push(`/reserva/${mockReservationCode}`)}>Confirmar compra</PrimaryButton>
          <SecondaryButton type="button" onClick={onClose}>Volver</SecondaryButton>
        </div>
      </section>
    </div>
  );
}
