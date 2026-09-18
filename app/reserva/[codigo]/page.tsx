"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { MobilePageContainer } from "@/components/MobilePageContainer";
import { EventLocationCard } from "@/components/EventLocationCard";
import { PaymentDetailsCard } from "@/components/PaymentDetailsCard";
import { ReservationSummaryCard } from "@/components/ReservationSummaryCard";
import { whatsappDisplayNumber, whatsappNumber } from "@/lib/event-data";
import { formatPrice } from "@/lib/format";
import type { CreateReservationResponse } from "@/types";

function formatExpiration(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

export default function ReservationPage({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = use(params);
  const [data, setData] = useState<CreateReservationResponse | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`reservation:${codigo}`);
    if (!stored) return;
    // sessionStorage is an external browser store and can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { setData(JSON.parse(stored)); } catch { setData(null); }
  }, [codigo]);

  if (!data?.reservation) {
    return <MobilePageContainer><p className="eyebrow">Reserva registrada</p><h1 className="mt-2 text-[2rem] font-extrabold">Guardá tu código</h1><p className="mt-5 text-zinc-400">Por seguridad, los datos de esta reserva ya no están disponibles en este navegador. Consultá su estado con tu DNI y código.</p><Link href="/consulta" className="mt-6 flex min-h-14 items-center justify-center rounded-[17px] bg-accent px-5 font-bold text-ink">Consultar mi entrada</Link></MobilePageContainer>;
  }

  const backendReservation = data.reservation;
  const reservation = {
    ...backendReservation,
    expiresAt: formatExpiration(backendReservation.expiresAt),
  };
  const formattedPrice = formatPrice(backendReservation.price);
  const message = `Hola, envío el comprobante de mi entrada de Recibida IA.\n\nNombre: ${backendReservation.name}\nDNI: ${backendReservation.dni}\nCódigo de reserva: ${backendReservation.code}\nPrecio reservado: ${formattedPrice}\n\nAdjunto el comprobante de transferencia.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return <MobilePageContainer>
    <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Listo, recibimos tus datos</p><h1 className="mt-2 text-[2rem] font-extrabold tracking-[-0.035em]">Compra registrada</h1></div><span className="mt-1 shrink-0 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-200">Pendiente</span></div>
    <div className="mt-6 space-y-3"><ReservationSummaryCard reservation={reservation} /><PaymentDetailsCard /></div>
    <p className={`mt-4 rounded-[20px] border p-4 text-sm ${data.emailSent ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200" : "border-amber-400/20 bg-amber-400/[0.07] text-amber-200"}`}>{data.emailSent ? "Te enviamos el código de reserva a tu email." : "No pudimos enviar el email. Guardá este código."}</p>
    <aside className="mt-4 rounded-[20px] border border-line/80 bg-[#111113] p-5 text-sm leading-6 text-zinc-400"><p className="font-semibold text-zinc-200">Guardá tu código de reserva</p><p className="mt-1">Para verificar el estado vas a necesitar tu DNI y el código. Podés hacerlo desde <Link href="/consulta" className="font-semibold text-accent underline decoration-accent/40 underline-offset-4">Consultar mi entrada</Link>.</p></aside>
    <div className="mt-6 text-center"><p className="text-sm text-zinc-500">Enviá el comprobante al</p><p className="mt-1.5 text-xl font-bold tracking-wide">{whatsappDisplayNumber}</p></div>
    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-accent px-4 text-center text-[15px] font-bold text-ink">Enviar comprobante por WhatsApp</a>
    <div className="mt-6"><EventLocationCard /></div>
    <div className="mt-6 rounded-[20px] border border-line bg-[#111114] p-5 text-sm leading-6 text-zinc-400"><p className="font-semibold text-zinc-200">Esperamos tu comprobante hasta el vencimiento indicado.</p><p className="mt-1">La entrada se confirma cuando validamos el pago.</p></div>
  </MobilePageContainer>;
}
