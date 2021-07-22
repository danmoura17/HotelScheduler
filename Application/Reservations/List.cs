using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reservations
{
    public class List
    {
        public class Query : IRequest<List<Reservation>> { }

        public class Handler : IRequestHandler<Query, List<Reservation>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Reservation>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Reservations.ToListAsync();
            }
        }
    }
}