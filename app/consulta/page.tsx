import { BackLink } from "@/components/BackLink";
import { ConsultationForm } from "@/components/ConsultationForm";
import { EventInfoCard } from "@/components/EventInfoCard";
import { ExperienceShell } from "@/components/ExperienceShell";

export default function ConsultationPage() {
  return (
    <ExperienceShell>
      <BackLink />
      <header className="mt-4 sm:mt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent/75">Estado de tu entrada</p>
        <h1 className="mt-2.5 text-[clamp(2.15rem,11vw,3.7rem)] font-black leading-[0.98] tracking-[-0.055em] text-white sm:mt-3 sm:leading-[0.95] sm:tracking-[-0.06em]">Consultar mi entrada</h1>
      </header>
      <div className="mt-5 sm:mt-6"><EventInfoCard showName /></div>
      <div className="mt-6 pb-2 sm:mt-8 sm:pb-5"><ConsultationForm /></div>
    </ExperienceShell>
  );
}
