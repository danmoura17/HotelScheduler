using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Reservations;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ReservationsController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservation(Guid id)
        {
            return HandleResult(await Mediator.Send( new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody]Reservation reservation)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Reservation = reservation}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditReservation (Guid id, Reservation reservation)
        {
            reservation.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Reservation = reservation}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}