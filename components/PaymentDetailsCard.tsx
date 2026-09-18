import { alias, paymentOwner } from "@/lib/mock-data";
import { CopyButton } from "./CopyButton";

export function PaymentDetailsCard() {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="text-lg font-black">Datos de transferencia</h2>
      <dl className="mt-5 space-y-5">
        <div><dt className="text-sm text-zinc-400">Alias:</dt><dd className="mt-1 text-xl font-black tracking-wide">{alias}</dd></div>
        <div><dt className="text-sm text-zinc-400">Titular:</dt><dd className="mt-1 font-bold">{paymentOwner}</dd></div>
      </dl>
      <div className="mt-5"><CopyButton value={alias} label="Copiar alias" /></div>
    </section>
  );
}
