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
  expiresAt: string;
  status: ReservationStatus;
};

export type BackendReservation = {
  code: string;
  name: string;
  dni: string;
  price: number;
  expiresAt: string;
  email?: string;
  gender?: Gender;
  status?: string;
};

export type CreateReservationResponse = {
  ok: boolean;
  reservation?: BackendReservation;
  emailSent?: boolean;
  error?: string;
  code?: string;
};

export type ReservationFormValues = Pick<Reservation, "name" | "dni" | "email"> & {
  confirmEmail: string;
  gender: Gender | "";
};
