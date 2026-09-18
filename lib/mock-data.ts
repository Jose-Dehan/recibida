import type { Reservation } from "@/types";

export const alias = "jose.dehan.mp";
export const paymentOwner = "Josefina Dehan";
export const reservas: Reservation[] = [
  {
    code: "DEMO-A1B2C",
    name: "Reserva de muestra",
    dni: "00.000.000",
    email: "juan@ejemplo.com",
    gender: "Hombre",
    price: 45000,
    tier: "Tanda 2",
    expiresAt: "22/09/2026",
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
    expiresAt: "24/09/2026",
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
    expiresAt: "15/09/2026",
    status: "expired",
  },
];
