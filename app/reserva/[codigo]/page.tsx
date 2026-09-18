import { MobilePageContainer } from "@/components/MobilePageContainer";
import { PaymentDetailsCard } from "@/components/PaymentDetailsCard";
import { ReservationSummaryCard } from "@/components/ReservationSummaryCard";
import { mockReservation, whatsappNumber } from "@/lib/mock-data";

export default function ReservationPage() {
  const message = `Hola, envío el comprobante de mi entrada.\n\nNombre: ${mockReservation.name}\nDNI: ${mockReservation.dni}\nCódigo de reserva: ${mockReservation.code}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  return (
    <MobilePageContainer>
      <p className="text-sm font-black uppercase tracking-[0.15em] text-accent">✓ Reserva realizada</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight">Tu entrada fue reservada</h1>
      <div className="mt-7 space-y-4"><ReservationSummaryCard reservation={mockReservation} /><PaymentDetailsCard /></div>
      <p className="mt-6 text-sm leading-6 text-zinc-300">Realizá la transferencia y enviá el comprobante por WhatsApp junto con tu nombre y DNI.</p>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-4 text-center text-sm font-extrabold uppercase tracking-wide text-ink outline-none hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Enviar comprobante por WhatsApp</a>
      <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100"><strong className="block">Tu entrada todavía no está confirmada.</strong>Queda pendiente hasta que validemos el pago.</div>
      <p className="mt-5 text-center text-sm text-zinc-400">Te enviamos el código de reserva por email.</p>
    </MobilePageContainer>
  );
}
