using InimcoDemo.Api.Model;
using Microsoft.EntityFrameworkCore;

namespace InimcoDemo.Api.Context
{
    public class PersonDbContext : DbContext
    {
        public PersonDbContext(DbContextOptions<PersonDbContext> options): base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<SocialMediaAccount> SocialMediaAccounts { get; set; }
        public DbSet<Skill> Skills { get; set; }

        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "PersonDB");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>()
                .HasMany(e => e.SocialMediaAccounts)
                .WithOne(e => e.Person)
                .HasForeignKey(e => e.PersonId)
                .IsRequired();

            modelBuilder.Entity<Person>()
                .HasMany(e => e.Skills)
                .WithOne(e => e.Person)
                .HasForeignKey(e => e.PersonId)
                .IsRequired();
        }
    }
}
