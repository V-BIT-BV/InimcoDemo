using InimcoDemo.Api.DTO;
using InimcoDemo.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InimcoDemo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpPost()]
        public async Task<Guid> CreatePerson(CreatePersonRequest request, CancellationToken cancellationToken)
        {
            await Task.Delay(1000, cancellationToken);
            var personId = await _personRepository.CreatePerson(request, cancellationToken);
            return personId;
        }

        [HttpPost("{personId:Guid}/socialmediaaccounts")]
        public async Task<IActionResult> SaveSocialMediaAccounts(Guid personId, SaveSocialMediaAccountsRequest request, CancellationToken cancellationToken)
        {
            await Task.Delay(1000, cancellationToken);
            await _personRepository.UpdateSocialMediaAccounts(personId, request, cancellationToken);
            return Ok();
        }

        [HttpPost("{personId:Guid}/skills")]
        public async Task<IActionResult> SaveSkills(Guid personId, SaveSkillsRequest request, CancellationToken cancellationToken)
        {
            await Task.Delay(1000, cancellationToken);
            await _personRepository.UpdateSkills(personId, request, cancellationToken);
            return Ok();
        }

        [HttpGet("{personId:Guid}/output")]
        public async Task<string> GetOutput(Guid personId, CancellationToken cancellationToken)
        {
            await Task.Delay(1000, cancellationToken);
            return await _personRepository.GetOutput(personId, cancellationToken);
        }
    }
}
