using System;
using Domain;
using FluentValidation;
using Microsoft.VisualBasic;

namespace Application.Reservations
{
    public class ReservationValidator:AbstractValidator<Reservation>
    {
        public ReservationValidator()
        {
            RuleFor(x => x.CheckinDate).NotEmpty();
            RuleFor(x => x.CheckoutDate).NotEmpty();
            RuleFor(x => x.ReservationDate).NotEmpty();
            RuleFor(x => x.AttendedBy).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty();
        }
    }
}