using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reservations
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Reservation Reservation { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var reservation = await _context.Reservations.FindAsync(request.Reservation.Id);

                _mapper.Map(request.Reservation, reservation);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}