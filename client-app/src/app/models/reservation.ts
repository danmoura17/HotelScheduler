export interface Reservation {
    id: string;
    reservationDate: Date | null;
    checkinDate: Date | null;
    checkoutDate: Date | null;
    attendedBy: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}