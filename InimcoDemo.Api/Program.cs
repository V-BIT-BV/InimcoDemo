using InimcoDemo.Api.Context;
using InimcoDemo.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);
var corsPolicyName = "LocalhostCorsPolicy";

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins("http://localhost:4200");
        policy.WithMethods("GET", "POST");
        policy.AllowAnyHeader();
    });
});
builder.Services.AddDbContext<PersonDbContext>();
builder.Services.AddScoped<IPersonRepository, PersonRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(corsPolicyName);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
