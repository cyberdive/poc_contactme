using System;

namespace NewContactMe.Models
{
    public class Client
    {
        public string ClientNumber { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public bool Alert { get; set; }
    }
}
