import type { Metadata, Viewport } from "next";
import { eventName } from "@/lib/event-data";
import "./globals.css";

export const metadata: Metadata = {
  title: `${eventName} | Entradas`,
  description: `Comprá tu entrada para ${eventName}.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
