import { BackLink } from "@/components/BackLink";
import { ConsultationForm } from "@/components/ConsultationForm";
import { EventInfoCard } from "@/components/EventInfoCard";
import { ExperienceShell } from "@/components/ExperienceShell";

export default function ConsultationPage() {
  return (
    <ExperienceShell>
      <BackLink />
      <header className="mt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent/75">Estado de tu entrada</p>
        <h1 className="mt-3 text-[clamp(2.65rem,13vw,3.7rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">Consultar mi entrada</h1>
      </header>
      <div className="mt-6"><EventInfoCard showName /></div>
      <div className="mt-8 pb-5"><ConsultationForm /></div>
    </ExperienceShell>
  );
}
