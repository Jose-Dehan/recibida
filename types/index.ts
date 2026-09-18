export type ReservationStatus =
  | "pending"
  | "verified"
  | "expired"
  | "rejected"
  | "cancelled";

export type PublicReservationStatus = "pending" | "approved" | "rejected";

export type Reservation = {
  code: string;
  name: string;
  dni: string;
  email: string;
  price: number;
  tier: string;
  validUntil: string;
  status: ReservationStatus;
};

export type ReservationFormValues = Pick<Reservation, "name" | "dni" | "email">;
