using System.Collections;
using System.Text.Json.Serialization;

namespace InimcoDemo.Api.Model
{
    public class Person
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }

        public ICollection<Skill> Skills { get; set; } = [];
        public ICollection<SocialMediaAccount> SocialMediaAccounts { get; set; } = [];
    }
}
