import { paymentAlias, paymentOwner } from "@/lib/event-data";
import { CopyButton } from "./CopyButton";

export function PaymentDetailsCard() {
  return (
    <section className="rounded-[20px] border border-line/80 bg-[#141416] p-5 shadow-card">
      <h2 className="text-lg font-bold">Datos para transferir</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 border-t border-line/70 pt-4 sm:grid-cols-2">
        <div><dt className="text-sm text-zinc-500">Alias</dt><dd className="mt-1 text-xl font-bold tracking-wide">{paymentAlias}</dd></div>
        <div><dt className="text-sm text-zinc-500">Titular</dt><dd className="mt-1 font-semibold">{paymentOwner}</dd></div>
      </dl>
      <div className="mt-4"><CopyButton value={paymentAlias} label="Copiar alias" /></div>
    </section>
  );
}
