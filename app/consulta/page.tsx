import { BackLink } from "@/components/BackLink";
import { ConsultationForm } from "@/components/ConsultationForm";
import { MobilePageContainer } from "@/components/MobilePageContainer";

export default function ConsultationPage() {
  return <MobilePageContainer><BackLink /><h1 className="mt-5 text-3xl font-black tracking-tight">Consultar mi entrada</h1><p className="mt-3 text-sm leading-6 text-zinc-400">Ingresá los datos de tu reserva para consultar su estado.</p><div className="mt-8"><ConsultationForm /></div></MobilePageContainer>;
}
