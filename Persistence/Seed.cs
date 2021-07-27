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
                    new AppUser{DisplayName = "Noémie",UserName="noemie", Email="noemie@test.com"},

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
                    AttendedBy = "Daniel",
                    FirstName = "Peter",
                    LastName = "Parker",
                    City="New York",
                    Country="USA",
                    Email="peter@test.com",
                    Phone="123456789"
                },
                new Reservation
                {
                    ReservationDate = DateTime.Now,
                    CheckinDate = DateTime.Now.AddDays(1),
                    CheckoutDate = DateTime.Now.AddDays(2),
                    AttendedBy = "Alex",
                    FirstName = "Arsene",
                    LastName = "Lupin",
                    City="Paris",
                    Country="France",
                    Email="lupin@test.com",
                    Phone="987654321"
                },
            };

            await context.Reservations.AddRangeAsync(reservations);
            await context.SaveChangesAsync();
        }
    }
}