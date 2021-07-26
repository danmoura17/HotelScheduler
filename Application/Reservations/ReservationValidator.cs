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
        }
    }
}