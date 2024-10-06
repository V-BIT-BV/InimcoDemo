using System.ComponentModel.DataAnnotations;

namespace InimcoDemo.Api.DTO
{
    public class CreatePersonRequest
    {
        [Required] public required string FirstName { get; set; }
        [Required] public required string LastName { get; set; }
    }
}
