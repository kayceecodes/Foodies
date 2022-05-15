using System.Collections.Generic;
using Foodies_api.Data;
using Foodies_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace Foodies_api.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : Controller
    {
        private readonly ApplicationDbContext _context;

        private readonly RestClient _client;
        private string token = 
        "CSiguMJNp2BL4tZcudgNueu6CPRy-lax1Zltio523c0ecnCmbdL0LIlAdfMeMntl85UOQoYCyJ8kJvRSGu2X_LvqBGLbcZSaT6yihQXsLV-MOPWJWvI_z8cUeJdTYnYx";
        public BusinessController(ApplicationDbContext context)
        {
            _context = context;
            _client = new RestClient("https://api.yelp.com/v3/businesses/search?");
        }

        [HttpGet]
        [HttpGet("{searchTerm}")]
        public async Task<ActionResult> GetBusinesses(SearchTerm searchTerm)
        {
            HttpClient Http = new();
            Http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if(searchTerm.Location == null && (searchTerm.Latitude == null && searchTerm.Longitude == null))
            {
                throw new Exception("You must enter at least one of the two, location (zipcode) or both lat & lng.");
            }

            var resp = await Http.GetAsync($"https://api.yelp.com/v3/businesses/search?location={searchTerm.Location}&radius={searchTerm.Radius}");
            
            var jsonString = await resp.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<YelpResponse>(jsonString);
     
            if(result == null) 
            {
                throw new Exception("Response Failed, Get Businesses");
            }

            return Ok(result.Businesses);
        }
    }
}
