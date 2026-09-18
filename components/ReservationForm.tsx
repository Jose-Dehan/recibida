"use client";

import { useState } from "react";
import type { ReservationFormValues } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ConfirmationBottomSheet } from "./ConfirmationBottomSheet";

const initialValues: ReservationFormValues = { name: "", dni: "", email: "", gender: "" };

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
          <span className="mb-2 block text-sm font-semibold text-zinc-200">Nombre y apellido</span>
          <input className="field" name="name" autoComplete="name" required value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Ej. Juan Pérez" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">DNI</span>
          <input className="field" name="dni" inputMode="numeric" autoComplete="off" required value={values.dni} onChange={(e) => update("dni", e.target.value)} placeholder="Sin puntos" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">Gmail</span>
          <input className="field" name="email" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="nombre@gmail.com" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">Género</span>
          <select className="field appearance-none" name="gender" required value={values.gender} onChange={(e) => update("gender", e.target.value)}>
            <option value="" disabled>Seleccioná una opción</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
        </label>
        <PrimaryButton type="submit">Continuar con la compra</PrimaryButton>
      </form>
      <ConfirmationBottomSheet open={open} values={values} price={price} onClose={() => setOpen(false)} />
    </>
  );
}
