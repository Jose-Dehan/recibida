"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, LoaderCircle } from "lucide-react";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { PaymentDetailsCard } from "@/components/PaymentDetailsCard";
import { ReceiptUploader } from "@/components/ReceiptUploader";
import { ReservationSummaryCard } from "@/components/ReservationSummaryCard";
import { StatusBadge } from "@/components/StatusBadge";
import { normalizeReservationStatus } from "@/lib/reservation-status";
import type { CreateReservationResponse } from "@/types";

function formatExpiration(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function HomeBackButton() {
  return (
    <Link href="/" aria-label="Volver al inicio" className="group mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.035] text-zinc-400 outline-none transition hover:border-accent/25 hover:bg-accent/[0.06] hover:text-accent focus-visible:ring-2 focus-visible:ring-accent">
      <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.9} />
    </Link>
  );
}

export default function ReservationPage({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = use(params);
  const router = useRouter();
  const [data, setData] = useState<CreateReservationResponse | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`reservation:${codigo}`);
    if (!stored) return;
    // sessionStorage is an external browser store and can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { setData(JSON.parse(stored)); } catch { setData(null); }
  }, [codigo]);

  useEffect(() => {
    if (!uploadSuccess) return;

    const redirectTimeout = window.setTimeout(() => router.push("/"), 3000);
    return () => window.clearTimeout(redirectTimeout);
  }, [router, uploadSuccess]);

  if (uploadSuccess) {
    return (
      <MobilePageContainer>
        <section className="relative mt-[12vh] overflow-hidden rounded-[28px] border border-accent/25 bg-[linear-gradient(145deg,rgba(214,243,106,0.1),rgba(17,18,17,0.97)_48%)] px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.42),0_0_38px_rgba(214,243,106,0.08)] backdrop-blur-xl">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.1] text-accent shadow-[0_0_30px_rgba(214,243,106,0.16)]">
            <CheckCircle2 aria-hidden="true" className="h-8 w-8" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 text-[clamp(2rem,9vw,2.75rem)] font-black leading-tight tracking-[-0.045em] text-white">¡Gracias por tu compra!</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-zinc-300">Recibimos tu comprobante. En breve revisaremos el pago.</p>
          <p className="mt-7 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500">
            <LoaderCircle aria-hidden="true" className="h-3.5 w-3.5 animate-spin text-accent/70" />
            Volviendo al inicio...
          </p>
        </section>
      </MobilePageContainer>
    );
  }

  if (!data?.reservation) {
    return <MobilePageContainer><HomeBackButton /><p className="eyebrow">Reserva registrada</p><h1 className="mt-2 text-[2rem] font-extrabold">Guardá tu código</h1><p className="mt-5 text-zinc-400">Por seguridad, los datos de esta reserva ya no están disponibles en este navegador. Consultá su estado con tu DNI y código.</p><Link href="/consulta" className="mt-6 flex min-h-14 items-center justify-center rounded-[17px] bg-accent px-5 font-bold text-ink">Consultar mi entrada</Link></MobilePageContainer>;
  }

  const backendReservation = data.reservation;
  const reservation = {
    ...backendReservation,
    expiresAt: backendReservation.expiresAt ? formatExpiration(backendReservation.expiresAt) : undefined,
  };
  const status = normalizeReservationStatus(backendReservation.status) ?? "Pendiente";
  const canUploadReceipt = status === "Pendiente";

  return <MobilePageContainer>
    <HomeBackButton />
    <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Listo, recibimos tus datos</p><h1 className="mt-2 text-[2rem] font-extrabold tracking-[-0.035em]">Compra registrada</h1></div><div className="mt-1 shrink-0"><StatusBadge status={status} /></div></div>
    <div className="mt-6 space-y-3"><ReservationSummaryCard reservation={reservation} /><PaymentDetailsCard /></div>
    <aside className="relative mt-4 overflow-hidden rounded-[22px] border border-accent/[0.16] bg-[linear-gradient(135deg,rgba(214,243,106,0.055),rgba(17,17,19,0.96)_48%)] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.25),0_0_28px_rgba(214,243,106,0.035)]">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="relative">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent">Importante</p>
        <div className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">
          <p className={data.emailSent === false ? "text-amber-200" : "text-zinc-300"}>{data.emailSent !== false ? "Te enviamos el código de reserva a tu email. Si no lo encontrás, revisá la carpeta de spam." : "No pudimos enviar el email. Guardá este código de reserva."}</p>
          <p>Guardá tu código de reserva. Lo vas a necesitar junto con tu DNI para <Link href="/consulta" className="font-semibold text-accent underline decoration-accent/40 underline-offset-4">consultar el estado de tu entrada</Link>.</p>
          <p>Esperamos tu comprobante hasta el vencimiento indicado.</p>
          <p className="font-semibold text-zinc-200">La entrada se confirma cuando validamos el pago.</p>
        </div>
      </div>
    </aside>
    {canUploadReceipt && <div className="mt-5"><ReceiptUploader dni={backendReservation.dni} codigo={backendReservation.code} existingReceipt={backendReservation.receiptUploaded === true} onUploaded={() => setUploadSuccess(true)} /></div>}
  </MobilePageContainer>;
}
