using System;
using System.Collections.Generic;
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
    }
}