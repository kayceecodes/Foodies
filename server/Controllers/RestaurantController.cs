using Foodies_api.Data;
using Foodies_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Foodies_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RestaurantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurants()
        {
            return _context.Restaurants.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurantById(int id)
        {
            return Ok(_context.Restaurants.FirstOrDefault(r => r.Id == id)); 
        }

        [HttpPost]
        public ActionResult<Restaurant> PostRestaurant(Restaurant restaurant)
        {
            _context.Restaurants.Add (restaurant);
            Console.WriteLine(restaurant.Id);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
