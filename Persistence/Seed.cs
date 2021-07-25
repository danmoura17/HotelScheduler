using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if(!userManager.Users.Any()){
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Alex",UserName="alex", Email="alex@test.com"},
                    new AppUser{DisplayName = "Daniel",UserName="daniel", Email="daniel@test.com"},
                    new AppUser{DisplayName = "Mary",UserName="mary", Email="mary@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Reservations.Any()) return;
            
            var reservations = new List<Reservation>
            {
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(-1),
                    CheckinDate = DateTime.Now,
                    CheckoutDate = DateTime.Now.AddDays(1),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now,
                    CheckinDate = DateTime.Now.AddDays(1),
                    CheckoutDate = DateTime.Now.AddDays(2),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(1),
                    CheckinDate = DateTime.Now.AddDays(2),
                    CheckoutDate = DateTime.Now.AddDays(3),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(2),
                    CheckinDate = DateTime.Now.AddDays(3),
                    CheckoutDate = DateTime.Now.AddDays(4),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(3),
                    CheckinDate = DateTime.Now.AddDays(4),
                    CheckoutDate = DateTime.Now.AddDays(5),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(4),
                    CheckinDate = DateTime.Now.AddDays(5),
                    CheckoutDate = DateTime.Now.AddDays(6),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(5),
                    CheckinDate = DateTime.Now.AddDays(6),
                    CheckoutDate = DateTime.Now.AddDays(7),
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now.AddDays(6),
                    CheckinDate = DateTime.Now.AddDays(7),
                    CheckoutDate = DateTime.Now.AddDays(8),
                }
            };

            await context.Reservations.AddRangeAsync(reservations);
            await context.SaveChangesAsync();
        }
    }
}