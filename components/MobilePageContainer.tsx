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
    <main className={`safe-page mx-auto min-h-screen min-h-[100dvh] w-full overflow-x-hidden px-4 min-[375px]:px-5 sm:px-6 ${wide ? "max-w-4xl" : "max-w-[430px]"} ${className}`}>
      {children}
    </main>
  );
}
