using InimcoDemo.Api.Context;
using InimcoDemo.Api.DTO;
using InimcoDemo.Api.Model;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace InimcoDemo.Api.Repositories
{
    public interface IPersonRepository
    {
        Task<Guid> CreatePerson(CreatePersonRequest request, CancellationToken cancellationToken);
        Task UpdateSocialMediaAccounts(Guid personId, SaveSocialMediaAccountsRequest request, CancellationToken cancellationToken);
        Task UpdateSkills(Guid personId, SaveSkillsRequest request, CancellationToken cancellationToken);
        Task<string> GetOutput(Guid personId, CancellationToken cancellationToken);
    }

    public class PersonRepository : IPersonRepository
    {
        private static readonly JsonSerializerOptions _jsonSerializerOptions = new() { WriteIndented = true };
        private readonly PersonDbContext _personDbContext;

        public PersonRepository(PersonDbContext personDbContext) {
            _personDbContext = personDbContext;
        }

        public async Task<Guid> CreatePerson(CreatePersonRequest request, CancellationToken cancellationToken)
        {            
            var person = new Person 
            { 
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName                
            };

            await _personDbContext.AddAsync(person, cancellationToken);
            await _personDbContext.SaveChangesAsync(cancellationToken);

            return person.Id;
        }

        public async Task UpdateSkills(Guid personId, SaveSkillsRequest request, CancellationToken cancellationToken)
        {            
            var person = await _personDbContext.Persons
                .Include(p => p.Skills)
                .SingleAsync(p => p.Id == personId, cancellationToken);
            person.Skills.Clear();

            if (request.Skills != null)
            {
                foreach (var skillName in request.Skills)
                {
                    var skill = new Skill { Id = Guid.NewGuid(), Name = skillName };
                    person.Skills.Add(skill);

                    await _personDbContext.AddAsync(skill, cancellationToken);
                }
            }

            await _personDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateSocialMediaAccounts(Guid personId, SaveSocialMediaAccountsRequest request, CancellationToken cancellationToken)
        {
            var person = await _personDbContext.Persons
                .Include (p => p.SocialMediaAccounts)
                .SingleAsync(p => p.Id == personId, cancellationToken);
            person.SocialMediaAccounts.Clear();

            if (request.SocialMediaAccounts != null)
            {
                foreach (var accountEntry in request.SocialMediaAccounts)
                {
                    var account = new SocialMediaAccount { Id = Guid.NewGuid(), Type = accountEntry.Type, Address = accountEntry.Address };
                    person.SocialMediaAccounts.Add(account);

                    await _personDbContext.AddAsync(account, cancellationToken);
                }
            }

            await _personDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<string> GetOutput(Guid personId, CancellationToken cancellationToken)
        {
            var sb = new StringBuilder();
            
            var person = await _personDbContext.Persons
                .Include(p => p.SocialMediaAccounts)
                .Include(p => p.Skills)
                .SingleAsync(p => p.Id == personId, cancellationToken);
            var name = $"{person.FirstName} {person.LastName}";

            sb.AppendLine($"The number of VOWELS: {GetVowelCount(name)}");
            sb.AppendLine($"The number of CONSONANTS: {GetConsonantCount(name)}");
            sb.AppendLine($"The first name + last name entered: {name}");
            sb.AppendLine($"The reverse version of the first name and last name: {GetReversedString(name)}");
            sb.AppendLine($"The JSON format of the entire object: ");
            sb.AppendLine(SerializeObject(person));

            return sb.ToString();
        }

        private static int GetVowelCount(string value)
        {
            if(string.IsNullOrWhiteSpace(value)) return 0;

            return value.ToLowerInvariant().Count("aeiou".Contains);
        }

        private static int GetConsonantCount(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return 0;

            return value.ToLowerInvariant().Count("bcdfghjklmnpqrstvwxyz".Contains);
        }

        private static string GetReversedString(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return value;

            return new string(value.Reverse().ToArray());
        }

        private static string? SerializeObject(object obj)
        {
            if (obj == null) return null;

            return JsonSerializer.Serialize(obj, _jsonSerializerOptions);
        }
    }
}
