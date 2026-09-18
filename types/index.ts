export type ReservationStatus =
  | "pending"
  | "verified"
  | "expired"
  | "rejected"
  | "cancelled";

export type PublicReservationStatus = "pending" | "approved" | "rejected";

export type Gender = "Hombre" | "Mujer";

export type Reservation = {
  code: string;
  name: string;
  dni: string;
  email: string;
  gender: Gender;
  price: number;
  tier: string;
  validUntil: string;
  status: ReservationStatus;
};

export type ReservationFormValues = Pick<Reservation, "name" | "dni" | "email"> & {
  gender: Gender | "";
};
