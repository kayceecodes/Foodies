using System;

namespace Foodies_api.Models;
    public class Restaurant
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public List<Branches> Branches { get; set; } = new List<Branches>();
    }