using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reservations
{
    public class Details
    {
        public class Query : IRequest<Reservation>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Reservation>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Reservation> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Reservations.FindAsync(request.Id);
            }
        }
    }
}