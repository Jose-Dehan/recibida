"use client";

import { useState } from "react";
import type { ReservationFormValues } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ConfirmationBottomSheet } from "./ConfirmationBottomSheet";

const initialValues: ReservationFormValues = { name: "", dni: "", email: "" };

export function ReservationForm({ price }: { price: number }) {
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);

  function update(field: keyof ReservationFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <>
      <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setOpen(true); }}>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">Nombre y apellido</span>
          <input className="field" name="name" autoComplete="name" required value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Ej. Juan Pérez" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">DNI</span>
          <input className="field" name="dni" inputMode="numeric" autoComplete="off" required value={values.dni} onChange={(e) => update("dni", e.target.value)} placeholder="Sin puntos" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">Email</span>
          <input className="field" name="email" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="nombre@email.com" />
        </label>
        <PrimaryButton type="submit">Continuar</PrimaryButton>
        <p className="text-center text-sm text-zinc-400">Tu reserva dura 5 días.</p>
      </form>
      <ConfirmationBottomSheet open={open} values={values} price={price} onClose={() => setOpen(false)} />
    </>
  );
}
