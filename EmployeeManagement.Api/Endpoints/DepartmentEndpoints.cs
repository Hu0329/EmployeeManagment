using Microsoft.EntityFrameworkCore;
namespace EmployeeManagement.Api;

public static class DepartmentEndpoints
{
    const string GetDepartmentEndpointName = "GetDepartment";
    public static RouteGroupBuilder MapDepartmentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("departments")
                        .WithParameterValidation();

        group.MapGet("/", async (DataContext dbContext) =>
            await dbContext.Department
                            .Include(d => d.Employee) // Include employees if needed
                            .Include(d => d.DepartmentPosition!)
                            .ThenInclude(dp => dp.Position)
                            .Select(d => d.ToDepartmentDto()) // Include department positions if needed
                            .AsNoTracking()
                            .ToListAsync()
            ); // Map to DTOs

        group.MapGet("/{id}", async (int id, DataContext dbContext) =>
        {
            Department? department = await dbContext.Department
                                            .Include(d => d.Employee) // Eager load employees if needed
                                            .Include(d => d.DepartmentPosition!) // Eager load department positions if needed
                                                .ThenInclude(dp => dp.Position) // Eager load positions if needed
                                            .FirstOrDefaultAsync(d => d.Id == id);

            return department is null ? Results.NotFound() : Results.Ok(department.ToDepartmentDto());
        })
            .WithName(GetDepartmentEndpointName);


        group.MapPost("/", async (CreateDepartmentDto newDepartment, DataContext dbContext) =>
        {
            Department department = newDepartment.ToEntity();
            await dbContext.Department.AddAsync(department);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetDepartmentEndpointName, new { id = department.Id }, department.ToDepartmentChangeDto());
        })
        .WithParameterValidation();

        group.MapPut("/{id}", async (int id, UpdateDepartmentDto updatedDepartment, DataContext dbContext) =>
        {
            var existingDepartment = await dbContext.Department
                .Include(d => d.DepartmentPosition) // Include department positions
                .FirstOrDefaultAsync(d => d.Id == id);

            if (existingDepartment is null)
            {
                return Results.NotFound();
            }

            // Update department properties except for department positions
            existingDepartment.Name = updatedDepartment.Name;
            existingDepartment.UpdatedTime = DateOnly.FromDateTime(DateTime.UtcNow);

            // Update department positions
            existingDepartment.DepartmentPosition?.Clear(); // Clear existing positions
            existingDepartment.DepartmentPosition?.AddRange(updatedDepartment.PositionIds.Select(positionId => new DepartmentPosition
            {
                DepartmentId = id,
                PositionId = positionId
            }));

            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithParameterValidation();

        group.MapDelete("/{id}", async (int id, DataContext dbContext) =>
        {
            await dbContext.Department
                            .Where(department => department.Id == id)
                            .ExecuteDeleteAsync();
            await dbContext.DepartmentPosition
                            .Where(dp => dp.DepartmentId == id)
                            .ExecuteDeleteAsync();
            return Results.NoContent();
        });

        return group;
    }
}