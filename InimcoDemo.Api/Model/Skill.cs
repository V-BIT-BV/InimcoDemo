using System.Text.Json.Serialization;

namespace InimcoDemo.Api.Model
{
    public class Skill
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public required string Name { get; set; }

        [JsonIgnore]
        public Person Person { get; set; } = null!;
        [JsonIgnore]
        public Guid PersonId { get; set; }
    }
}
