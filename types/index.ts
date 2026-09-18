export type ReservationStatus = "Pendiente" | "Aprobado" | "Rechazado" | "Vencido";

export type ReservationLookupReason = "CODE_NOT_FOUND" | "DNI_MISMATCH";

export type ReservationLookupResponse = {
  ok: boolean;
  found?: boolean;
  reason?: ReservationLookupReason;
  reservation?: BackendReservation;
  status?: string;
  error?: string;
  code?: string;
};

export type Gender = "Hombre" | "Mujer";

export type Reservation = {
  code: string;
  name: string;
  dni: string;
  email: string;
  gender: Gender;
  price: number;
  tier: string;
  expiresAt?: string;
  status: ReservationStatus;
};

export type BackendReservation = {
  code: string;
  name: string;
  dni: string;
  price: number;
  expiresAt?: string;
  email?: string;
  gender?: Gender;
  status?: ReservationStatus | string;
};

export type CreateReservationErrorCode =
  | "PRICE_CHANGED"
  | "ACTIVE_RESERVATION_EXISTS"
  | "REJECTED_RESERVATION_EXISTS"
  | "SOLD_OUT"
  | "INVALID_DATA"
  | "NETWORK_ERROR";

export type CreateReservationResponse = {
  ok: boolean;
  reservation?: BackendReservation;
  emailSent?: boolean;
  price?: number;
  error?: string;
  code?: CreateReservationErrorCode | string;
};

export type ReservationFormValues = Pick<Reservation, "name" | "dni" | "email"> & {
  confirmEmail: string;
  gender: Gender | "";
};
