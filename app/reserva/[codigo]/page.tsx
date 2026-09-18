import { MobilePageContainer } from "@/components/MobilePageContainer";
import { EventLocationCard } from "@/components/EventLocationCard";
import { PaymentDetailsCard } from "@/components/PaymentDetailsCard";
import { ReservationSummaryCard } from "@/components/ReservationSummaryCard";
import { mockReservation, whatsappDisplayNumber, whatsappNumber } from "@/lib/mock-data";
import Link from "next/link";

export default function ReservationPage() {
  const message = `Hola, envío el comprobante de mi entrada.\n\nNombre: ${mockReservation.name}\nDNI: ${mockReservation.dni}\nCódigo de reserva: ${mockReservation.code}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  return (
    <MobilePageContainer>
      <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Listo, recibimos tus datos</p><h1 className="mt-2 text-[2rem] font-extrabold tracking-[-0.035em]">Compra registrada</h1></div><span className="mt-1 shrink-0 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-200">Pendiente</span></div>
      <div className="mt-6 space-y-3"><ReservationSummaryCard reservation={mockReservation} /><PaymentDetailsCard /></div>
      <aside className="mt-4 rounded-[20px] border border-line/80 bg-[#111113] p-5 text-sm leading-6 text-zinc-400"><p className="font-semibold text-zinc-200">Guardá tu código de reserva</p><p className="mt-1">Para verificar el estado de tu compra vas a necesitar tu DNI y el código de reserva. Podés hacerlo desde <Link href="/consulta" className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 outline-none hover:decoration-accent focus-visible:ring-2 focus-visible:ring-accent">Consultar mi entrada</Link>.</p></aside>
      <div className="mt-6 text-center"><p className="text-sm text-zinc-500">Enviá el comprobante al</p><p className="mt-1.5 text-xl font-bold tracking-wide">{whatsappDisplayNumber}</p></div>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-accent px-4 text-center text-[15px] font-bold text-ink shadow-[0_10px_30px_rgba(214,243,106,0.08)] outline-none transition-colors hover:bg-[#def77f] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Enviar comprobante por WhatsApp</a>
      <div className="mt-6"><EventLocationCard /></div>
      <div className="mt-6 rounded-[20px] border border-line bg-[#111114] p-5 text-sm leading-6 text-zinc-400"><p className="font-semibold text-zinc-200">Esperamos tu comprobante durante 5 días.</p><p className="mt-1">La entrada se confirma cuando validamos el pago.</p></div>
    </MobilePageContainer>
  );
}
