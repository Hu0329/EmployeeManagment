using System.Formats.Tar;
using EmployeeManagement.Api.Dtos;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.EntityFrameworkCore;
namespace EmployeeManagement.Api;

public static class EmployeeEndpoints
{
    const string GetEmployeeEndpointName = "GetEmployee";
    public static RouteGroupBuilder MapEmployeeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("employees")
                        .WithParameterValidation();

        group.MapGet("/", async (DataContext dbContext) =>
            await dbContext.Employee
                    .Include(employee => employee.Department)
                    .Include(employee => employee.Position)
                    .Select(employee => employee.ToEmployeeSummaryDto())
                    .AsNoTracking()
                    .ToListAsync());

        group.MapGet("/{id}", async (int id, DataContext dbContext) =>
        {
            var employee = await dbContext.Employee.FindAsync(id);
            if (employee == null)
            {
                return Results.NotFound();
            }
            var positionTracks = await dbContext.PositionTrack
                .Include(pt => pt.Employee)
                .Include(pt => pt.Position)
                .Include(pt => pt.Department)
                .Where(pt => pt.EmployeeId == id)
                .ToListAsync();

            var employeeDto = employee.ToEmployeeSummaryDto();
           List<PositionTrackDto> positionTrackDtos = positionTracks.ToPositionTrackDto(); 

            return Results.Ok(new { employeeDto, positionTrackDtos });
        })
            .WithName(GetEmployeeEndpointName);

        group.MapPost("/", async (CreateEmployeeDto newEmployee, DataContext dbContext) =>
        {
            Employee employee = newEmployee.ToEntity();
            dbContext.Employee.Add(employee);
            await dbContext.SaveChangesAsync();

            dbContext.PositionTrack.Add(new PositionTrack
            {
                EmployeeId = employee.Id,
                Action = "Create",
                PositionId = employee.PositionId,
                DepartmentId = employee.DepartmentId,
                Timestamp = DateTime.UtcNow
            });
            await dbContext.SaveChangesAsync();
            return Results.CreatedAtRoute(GetEmployeeEndpointName, new { id = employee.Id }, employee.ToEmployeeDetailDto());
        })
        .WithParameterValidation();

        group.MapPut("/{id}/edit", async (int id, UpdateEmployeeDto updatedEmployee, DataContext dbContext) =>
        {
            var existingEmployee = await dbContext.Employee.FindAsync(id);
            if (existingEmployee is null)
            {
                return Results.NotFound();
            }
            dbContext.Entry(existingEmployee)
            .CurrentValues
            .SetValues(updatedEmployee.ToEntity(id));
            await dbContext.SaveChangesAsync();

            dbContext.PositionTrack.Add(new PositionTrack
            {
                EmployeeId = existingEmployee.Id,
                Action = "Update",
                PositionId = existingEmployee.PositionId,
                DepartmentId = existingEmployee.DepartmentId,
                Timestamp = DateTime.UtcNow
            });

            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithParameterValidation();

        group.MapDelete("/{id}", async (int id, DataContext dbContext) =>
        {

            await dbContext.Employee
                            .Where(employee => employee.Id == id)
                            .ExecuteDeleteAsync();
            await dbContext.SaveChangesAsync();



            return Results.NoContent();
        });

        return group;
    }
}
