using System.Collections.Generic;
using System.Text.Json;
using Foodies_api.Data;
using Foodies_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;

namespace Foodies_api.Controllers
{
    [Authorize]
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
        public async Task<ActionResult> GetBusinesses()
        {
            HttpClient Http = new();
            Http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var resp = await Http.GetAsync("https://api.yelp.com/v3/businesses/search?location=19019&radius=40000");
            
            var jsonString = await resp.Content.ReadAsStringAsync();
            var result = JObject.Parse(jsonString);
     
            return Ok(jsonString);
        }
    }
}
