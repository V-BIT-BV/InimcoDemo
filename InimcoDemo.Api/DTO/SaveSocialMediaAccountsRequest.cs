using InimcoDemo.Api.Model;
using System.ComponentModel.DataAnnotations;

namespace InimcoDemo.Api.DTO
{
    public class SaveSocialMediaAccountsRequest
    {
        public IEnumerable<SocialMediaAccountEntry>? SocialMediaAccounts { get; set; }
    }

    public class SocialMediaAccountEntry
    {
        [Required] 
        public required SocialMediaType Type { get; set; }
        
        [Required]
        public required string Address { get; set; }
    }
}
