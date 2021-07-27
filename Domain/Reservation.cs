using System;

namespace Domain
{
    public class Reservation
    {
        public Guid Id { get; set; }

        public DateTime ReservationDate { get; set; }

        public DateTime CheckinDate { get; set; }

        public DateTime CheckoutDate { get; set; }

        public string AttendedBy { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}