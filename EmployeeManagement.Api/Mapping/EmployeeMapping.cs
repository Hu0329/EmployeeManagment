using EmployeeManagement.Api.Dtos;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace EmployeeManagement.Api;

public static class EmployeeMapping
{
    public static Employee ToEntity(this CreateEmployeeDto employee)
    {
        return new Employee()
        {
            First_name = employee.First_name,
            Last_name = employee.Last_name,
            PositionId = employee.PositionId,
            DepartmentId = employee.DepartmentId
        };
    }

    public static Employee ToEntity(this UpdateEmployeeDto employee, int id)
    {
        return new Employee()
        {
            Id = id,
            First_name = employee.First_name,
            Last_name = employee.Last_name,
            PositionId = employee.PositionId,
            DepartmentId = employee.DepartmentId
        };
    }

    public static EmployeeSummaryDto ToEmployeeSummaryDto(this Employee employee)
    {
        return new(
            employee.Id,
            employee.First_name,
            employee.Last_name,
            employee.Position!.Name,
            employee.Department!.Name
        );
    }

    public static EmployeeDetailDto ToEmployeeDetailDto(this Employee employee)
    {
        return new(
            employee.Id,
            employee.First_name,
            employee.Last_name,
            employee.PositionId,
            employee.DepartmentId

        );
    }


    public static List<PositionTrackDto> ToPositionTrackDto(this List<PositionTrack> positionTracks)
{
    if (positionTracks == null || positionTracks.Count == 0)
    {
        return []; 
    }

    var positionTrackDtos = new List<PositionTrackDto>();

    foreach (var positionTrack in positionTracks)
    {
        string firstName = positionTrack.Employee?.First_name ?? "Unknown";
        string lastName = positionTrack.Employee?.Last_name ?? "Unknown";
        string positionName = positionTrack.Position?.Name ?? "Unknown";
        string departmentName = positionTrack.Department?.Name ?? "Unknown";
        string action = positionTrack.Action ?? "Unknown";

        var positionTrackDto = new PositionTrackDto(
            positionTrack.Id,
            firstName,
            lastName,
            positionName,
            departmentName,
            positionTrack.Timestamp,
            action
        );

        positionTrackDtos.Add(positionTrackDto);
    }

    return positionTrackDtos;
}

}
