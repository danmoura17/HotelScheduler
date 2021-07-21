using System;

namespace Domain
{
    public class Reservation
    {
        public Guid Id { get; set; }

        public DateTime ReservationDate { get; set; }

        public DateTime CheckinDate { get; set; }

        public DateTime CheckoutDate { get; set; }
    }
}