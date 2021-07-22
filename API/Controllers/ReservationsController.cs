using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Reservations;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReservationsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetReservations()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(Guid id)
        {
            return await Mediator.Send( new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody]Reservation reservation)
        {
            return Ok(await Mediator.Send(new Create.Command{Reservation = reservation}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditReservation (Guid id, Reservation reservation)
        {
            reservation.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Reservation = reservation}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}