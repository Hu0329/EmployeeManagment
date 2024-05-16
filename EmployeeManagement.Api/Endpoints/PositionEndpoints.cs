using Microsoft.EntityFrameworkCore;
namespace EmployeeManagement.Api;

public static class PositionEndpoints
{
    const string GetPositionEndpointName = "GetPosition";
    public static RouteGroupBuilder MapPositionEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("positions")
                        .WithParameterValidation();

        group.MapGet("/", async (DataContext dbContext) =>
            await dbContext.Position
                            .Include(p=>p.Employee)
                            .Include(d => d.DepartmentPosition!)
                                .ThenInclude(dp => dp.Department)
                            .Select(p => p.ToPositionDto()) // Include department positions if needed
                            .AsNoTracking()
                            .ToListAsync()
            ); // Map to DTOs

        group.MapGet("/{id}", async (int id, DataContext dbContext) =>
        {
            Position? Position = await dbContext.Position.FindAsync(id);

            return Position is null ? Results.NotFound() : Results.Ok(Position.ToPositionDto());
        })
            .WithName(GetPositionEndpointName);


        group.MapPost("/", async (CreatePositionDto newPosition, DataContext dbContext) =>
       {
           Position position = newPosition.ToEntity();
           await dbContext.Position.AddAsync(position);
           await dbContext.SaveChangesAsync();

           return Results.CreatedAtRoute(GetPositionEndpointName, new { id = position.Id }, position.ToPositionDto());
       })
       .WithParameterValidation();

        group.MapPut("/{id}", async (int id, UpdatePositionDto updatedPosition, DataContext dbContext) =>
         {
             var existingPosition = await dbContext.Position
                 .Include(d => d.DepartmentPosition) // Include department positions
                 .FirstOrDefaultAsync(d => d.Id == id);

             if (existingPosition is null)
             {
                 return Results.NotFound();
             }

             // Update department properties except for department positions
             existingPosition.Name = updatedPosition.Name;

             // Update department positions
             existingPosition.DepartmentPosition?.Clear(); // Clear existing positions
             existingPosition.DepartmentPosition?.AddRange(updatedPosition.DepartmentIds.Select(departmentId => new DepartmentPosition
             {
                 PositionId = id,
                 DepartmentId = departmentId
             }));

             await dbContext.SaveChangesAsync();
             return Results.NoContent();
         })
         .WithParameterValidation();

        group.MapDelete("/{id}", async (int id, DataContext dbContext) =>
         {
             await dbContext.Position
                             .Where(position => position.Id == id)
                             .ExecuteDeleteAsync();
             await dbContext.DepartmentPosition
                             .Where(dp => dp.PositionId == id)
                             .ExecuteDeleteAsync();
             return Results.NoContent();
         });


        return group;
    }
}