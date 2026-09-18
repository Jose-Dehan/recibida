import type { ReactNode } from "react";

export function MobilePageContainer({
  children,
  wide = false,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <main className={`mx-auto min-h-screen w-full px-5 py-8 sm:px-6 sm:py-10 ${wide ? "max-w-4xl" : "max-w-[430px]"} ${className}`}>
      {children}
    </main>
  );
}
