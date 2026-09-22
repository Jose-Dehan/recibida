import type { ReactNode } from "react";

export function ExperienceShell({ children, centered = false }: { children: ReactNode; centered?: boolean }) {
  return (
    <main className={`relative min-h-screen min-h-[100svh] overflow-x-hidden bg-[#050806] ${centered ? "px-4 py-5 min-[375px]:px-5 min-[390px]:py-6 sm:px-7 sm:py-10" : "px-5 py-7 sm:px-7 sm:py-11"}`}>
      <div aria-hidden="true" className="home-grid pointer-events-none fixed inset-0 opacity-35" />
      <div aria-hidden="true" className="home-orb pointer-events-none fixed -right-28 -top-20 h-72 w-72 rounded-full bg-accent/[0.11] blur-[90px]" />
      <div aria-hidden="true" className="home-orb home-orb-delayed pointer-events-none fixed -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/[0.07] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[30%] h-64 w-[125%] -translate-x-1/2 -rotate-6 rounded-[50%] border border-accent/[0.055]" />
      <div className={`relative z-10 mx-auto w-full max-w-[460px] ${centered ? "flex min-h-[calc(100svh-2.5rem)] flex-col justify-start min-[390px]:min-h-[calc(100svh-3rem)] sm:min-h-[calc(100svh-5rem)] sm:justify-center" : ""}`}>
        {children}
      </div>
    </main>
  );
}
