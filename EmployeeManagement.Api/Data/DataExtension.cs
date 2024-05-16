using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Api;

public static class DataExtension
{
    public static async Task MigrateDbAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        await dbContext.Database.MigrateAsync();
        await Seed.SeedData(dbContext);

    }

}
