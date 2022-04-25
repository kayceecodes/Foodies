using Foodies_api.Data;
using Foodies_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace Foodies_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly RestClient _client;         
        public BusinessController(ApplicationDbContext context)
        {
            _context = context;
            _client = new RestClient("https://api.yelp.com/v3/businesses/search?location=19019&radius=40000");
        }

        [HttpGet]
        public ActionResult<IEnumerable<Restaurant>> GetBusiness()
        {
            return _context.Business.ToList();
        }
        [HttpGet("/")]
        public ActionResult<IEnumerable<Business>> GetBusinesses() 
        {

            
            return 
        }
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurantById(int id)
        {
            return Ok(_context.Business.FirstOrDefault(r => r.Id == id)); 
        }

        [HttpPost]
        public ActionResult<Restaurant> PostRestaurant(Restaurant restaurant)
        {
            _context.Business.Add (restaurant);
            Console.WriteLine(restaurant.Id);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
