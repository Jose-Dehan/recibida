import type { ReservationStatus } from "@/types";

export function normalizeReservationStatus(value: unknown): ReservationStatus | null {
  const status = String(value ?? "").trim().toUpperCase();

  switch (status) {
    case "PENDIENTE":
    case "PENDING":
      return "Pendiente";
    case "APROBADO":
    case "APPROVED":
    case "VERIFICADO":
    case "VERIFIED":
      return "Aprobado";
    case "RECHAZADO":
    case "REJECTED":
      return "Rechazado";
    case "VENCIDO":
    case "EXPIRED":
      return "Vencido";
    default:
      return null;
  }
}
