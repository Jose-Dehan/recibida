"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheck, CircleX, Clock3, FileWarning, TriangleAlert } from "lucide-react";
import type { BackendReservation, ReservationStatus } from "@/types";
import { PaymentDetailsCard } from "./PaymentDetailsCard";
import { ReceiptUploader } from "./ReceiptUploader";

const contactEmail = "recibidaia@gmail.com";

function StatusPanel({ icon: Icon, title, children, style, glow }: { icon: typeof Clock3; title: string; children: React.ReactNode; style: string; glow: string }) {
  return <section className={`relative overflow-hidden rounded-[20px] border bg-gradient-to-br from-current/[0.08] to-white/[0.025] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:rounded-[24px] sm:p-5 ${style}`}>
    <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${glow} to-transparent`} />
    <Icon aria-hidden="true" className="mb-3 h-6 w-6 sm:mb-4" strokeWidth={1.7} />
    <p className="text-lg font-extrabold tracking-tight sm:text-xl">{title}</p>
    {children}
  </section>;
}

function PendingReservation({ reservation }: { reservation: BackendReservation }) {
  const [receiptUploaded, setReceiptUploaded] = useState(reservation.receiptUploaded === true);

  if (receiptUploaded) {
    return (
      <StatusPanel icon={CircleCheck} title="Comprobante recibido" style="border-amber-400/30 bg-amber-400/10 text-amber-200" glow="via-amber-300/60">
        <p className="mt-2 text-sm leading-6 text-current opacity-70">Recibimos tu comprobante. Tu entrada sigue pendiente de validación.</p>
      </StatusPanel>
    );
  }

  return <>
      <StatusPanel icon={FileWarning} title="Falta subir el comprobante" style="border-amber-400/30 bg-amber-400/10 text-amber-200" glow="via-amber-300/60">
        <p className="mt-2 text-sm leading-6 text-current opacity-70">Si ya realizaste el pago, subí el comprobante para que podamos validarlo.</p>
      </StatusPanel>
    <div className="mt-4 space-y-4">
      <PaymentDetailsCard />
      <ReceiptUploader dni={reservation.dni} codigo={reservation.code} collapsed onUploaded={() => setReceiptUploaded(true)} />
    </div>
  </>;
}

function ApprovedReservation() {
  return (
    <StatusPanel icon={CircleCheck} title="Entrada aprobada" style="border-emerald-400/30 bg-emerald-400/10 text-emerald-300" glow="via-emerald-300/60">
      <p className="mt-2 text-sm leading-6 text-current opacity-65">Tu pago fue validado correctamente. Tu entrada está confirmada.</p>
    </StatusPanel>
  );
}

function ExpiredReservation() {
  return <>
    <StatusPanel icon={TriangleAlert} title="Reserva vencida" style="border-zinc-600/70 bg-zinc-800/70 text-zinc-300" glow="via-zinc-400/45">
      <p className="mt-2 text-sm leading-6 text-current opacity-65">El plazo de pago de esta reserva venció. Podés volver a comprar una entrada.</p>
    </StatusPanel>
    <Link href="/reservar" className="mt-4 flex min-h-[58px] items-center justify-center rounded-[20px] bg-accent px-5 text-center text-[15px] font-extrabold text-[#090b07]">Comprar otra entrada</Link>
    <p className="mt-4 text-center text-sm leading-6 text-zinc-400">Cualquier consulta, escribinos a <a className="font-semibold text-accent underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
  </>;
}

function RejectedReservation() {
  return <StatusPanel icon={CircleX} title="Reserva rechazada" style="border-red-400/30 bg-red-400/10 text-red-200" glow="via-red-300/55">
    <p className="mt-2 text-sm leading-6 text-current opacity-65">Esta reserva fue rechazada.</p>
    <p className="mt-3 text-sm leading-6 text-current opacity-75">Si necesitás ayuda, escribinos a <a className="font-semibold underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
  </StatusPanel>;
}

export function ReservationStatusCard({ status, reservation }: { status: ReservationStatus; reservation: BackendReservation }) {
  const reservationWithStatus = { ...reservation, status };

  return <div aria-live="polite">
    {status === "Pendiente" && <PendingReservation reservation={reservationWithStatus} />}
    {status === "Aprobado" && <ApprovedReservation />}
    {status === "Vencido" && <ExpiredReservation />}
    {status === "Rechazado" && <RejectedReservation />}
  </div>;
}
