import { paymentAlias, paymentOwner } from "@/lib/event-data";
import { CopyButton } from "./CopyButton";

export function PaymentDetailsCard() {
  return (
    <section className="rounded-[18px] border border-line/80 bg-[#141416] p-4 shadow-card sm:rounded-[20px] sm:p-5">
      <h2 className="text-lg font-bold">Datos para transferir</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 border-t border-line/70 pt-4 sm:grid-cols-2">
        <div className="min-w-0"><dt className="text-sm text-zinc-500">Alias</dt><dd className="mt-1 break-all text-lg font-bold tracking-wide sm:text-xl">{paymentAlias}</dd></div>
        <div><dt className="text-sm text-zinc-500">Titular</dt><dd className="mt-1 font-semibold">{paymentOwner}</dd></div>
      </dl>
      <div className="mt-4"><CopyButton value={paymentAlias} label="Copiar alias" /></div>
    </section>
  );
}
