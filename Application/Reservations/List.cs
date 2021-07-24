using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Reservations
{
    public class List
    {
        public class Query : IRequest<Result<List<Reservation>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Reservation>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Reservation>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Reservation>>.Success(await _context.Reservations.ToListAsync(cancellationToken));
            }
        }
    }
}