export interface Reservation {
    id: string;
    reservationDate: Date | null;
    checkinDate: Date | null;
    checkoutDate: Date | null;
}