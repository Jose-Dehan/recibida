"use client";

import { useState } from "react";
import { ArrowRight, UserRound } from "lucide-react";
import type { ReservationFormValues } from "@/types";
import { PrimaryButton } from "./Buttons";
import { ConfirmationBottomSheet } from "./ConfirmationBottomSheet";

const initialValues: ReservationFormValues = { name: "", dni: "", email: "", confirmEmail: "", gender: "" };
type FormErrors = Partial<Record<"name" | "dni" | "email" | "confirmEmail" | "gender", string>>;

function normalizeDni(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ReservationForm({ price, onPriceChange }: { price: number; onPriceChange: (price: number) => void }) {
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function update(field: keyof ReservationFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "dni" || field === "email" || field === "confirmEmail" || field === "gender") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dni = normalizeDni(values.dni);
    const email = normalizeEmail(values.email);
    const confirmEmail = normalizeEmail(values.confirmEmail);
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) nextErrors.name = "Ingresá tu nombre y apellido.";
    if (!/^\d{8}$/.test(dni)) nextErrors.dni = "Ingresá un DNI de 8 números.";
    else if (/^0+$/.test(dni)) nextErrors.dni = "Ingresá un DNI válido.";
    if (!isValidEmail(email)) nextErrors.email = "Ingresá un email con formato válido.";
    if (!confirmEmail) nextErrors.confirmEmail = "Volvé a ingresar tu email.";
    else if (email !== confirmEmail) nextErrors.confirmEmail = "Los emails no coinciden.";
    if (!values.gender) nextErrors.gender = "Seleccioná una opción.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setValues((current) => ({ ...current, dni, email, confirmEmail }));
    setOpen(true);
  }

  return (
    <>
      <form className="space-y-4 sm:space-y-5" onSubmit={submit} noValidate>
        <fieldset>
          <legend className="mb-2.5 text-sm font-semibold text-zinc-200">Género</legend>
          <input type="hidden" name="gender" value={values.gender} />
          <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-invalid={Boolean(errors.gender)}>
            {(["Hombre", "Mujer"] as const).map((gender) => {
              const selected = values.gender === gender;
              return (
                <button
                  key={gender}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`flex min-h-[52px] items-center justify-center gap-2 rounded-[16px] border text-sm font-bold outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-accent sm:min-h-14 sm:rounded-[18px] ${selected ? "border-accent/55 bg-accent/[0.12] text-accent shadow-[0_0_24px_rgba(214,243,106,0.08)]" : "border-white/[0.1] bg-white/[0.04] text-zinc-400 hover:border-white/[0.18] hover:text-zinc-200"}`}
                  onClick={() => update("gender", gender)}
                >
                  <UserRound aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />{gender}
                </button>
              );
            })}
          </div>
          {errors.gender && <p className="mt-2 text-sm text-red-300" role="alert">{errors.gender}</p>}
        </fieldset>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">Nombre y apellido</span>
          <input className="field" name="name" autoComplete="name" required value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Nombre y apellido" aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="mt-2 text-sm text-red-300" role="alert">{errors.name}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">DNI</span>
          <input className="field" name="dni" inputMode="numeric" autoComplete="off" pattern="[0-9]{8}" maxLength={8} required value={values.dni} onChange={(e) => update("dni", e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="Ingresá tu DNI" aria-invalid={Boolean(errors.dni)} aria-describedby={errors.dni ? "dni-error" : undefined} />
          {errors.dni && <p id="dni-error" className="mt-2 text-sm text-red-300" role="alert">{errors.dni}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">Gmail</span>
          <input className="field" name="email" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="nombre@gmail.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <p id="email-error" className="mt-2 text-sm text-red-300" role="alert">{errors.email}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-200">Confirmar Gmail</span>
          <input className="field" name="confirmEmail" type="email" inputMode="email" autoComplete="email" required value={values.confirmEmail} onChange={(e) => update("confirmEmail", e.target.value)} placeholder="Repetí tu email" aria-invalid={Boolean(errors.confirmEmail)} aria-describedby={errors.confirmEmail ? "confirm-email-error" : undefined} />
          {errors.confirmEmail && <p id="confirm-email-error" className="mt-2 text-sm text-red-300" role="alert">{errors.confirmEmail}</p>}
        </label>
        <PrimaryButton type="submit"><span className="flex w-full items-center justify-between"><span>Continuar con la compra</span><ArrowRight aria-hidden="true" className="h-5 w-5" /></span></PrimaryButton>
      </form>
      <ConfirmationBottomSheet open={open} values={values} price={price} onPriceChange={onPriceChange} onClose={() => setOpen(false)} />
    </>
  );
}
