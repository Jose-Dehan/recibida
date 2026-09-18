import type { Reservation } from "@/types";

export const alias = "FIESTA.PALERMO";
export const paymentOwner = "NOMBRE TITULAR";
export const whatsappNumber = "5491112345678";
export const whatsappDisplayNumber = "11 1234 5678";
export const mockReservationCode = "FIESTA-A7K92";

export const reservas: Reservation[] = [
  {
    code: mockReservationCode,
    name: "Juan Pérez",
    dni: "45.123.456",
    email: "juan@ejemplo.com",
    gender: "Hombre",
    price: 45000,
    tier: "Tanda 2",
    validUntil: "22/09/2026",
    status: "verified",
  },
  {
    code: "FIESTA-B4M18",
    name: "Sofía Gómez",
    dni: "43.821.907",
    email: "sofia@ejemplo.com",
    gender: "Mujer",
    price: 50000,
    tier: "Tanda 3",
    validUntil: "24/09/2026",
    status: "pending",
  },
  {
    code: "FIESTA-C8P31",
    name: "Mateo Silva",
    dni: "41.220.635",
    email: "mateo@ejemplo.com",
    gender: "Hombre",
    price: 40000,
    tier: "Tanda 1",
    validUntil: "15/09/2026",
    status: "expired",
  },
];

export const mockReservation: Reservation = reservas[0];
