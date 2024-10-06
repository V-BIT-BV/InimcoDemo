using System.Text.Json.Serialization;

namespace InimcoDemo.Api.Model
{
    public class SocialMediaAccount
    {

        [JsonIgnore]
        public Guid Id { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required SocialMediaType Type { get; set; }
        public required string Address { get; set; }

        [JsonIgnore]
        public Person Person { get; set; } = null!;
        [JsonIgnore]
        public Guid PersonId { get; set; }
    }

    public enum SocialMediaType
    {
        Facebook,
        LinkedIn,
        XTwitter,
        Discord,
        Reddit
    }
}
