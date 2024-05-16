namespace EmployeeManagement.Api;

public static class DepartmentMapping
{
    public static Department ToEntity(this CreateDepartmentDto department)
    {
        return new Department()
        {
            Name = department.Name,
            CreatedTime = DateOnly.FromDateTime(DateTime.UtcNow),
            UpdatedTime = DateOnly.FromDateTime(DateTime.UtcNow),
            DepartmentPosition =
                department.PositionIds.Select(positionId =>
                                                new DepartmentPosition
                                                { PositionId = positionId }
                                                ).ToList()
        };
    }

    public static Department ToEntity(this UpdateDepartmentDto department, int id, DateOnly CreatedTime)
    {
        var newPositionIds = department.PositionIds.ToHashSet(); // Convert to HashSet for efficient lookup

        return new Department()
        {
            Id = id,
            Name = department.Name,
            CreatedTime = CreatedTime,
            UpdatedTime = DateOnly.FromDateTime(DateTime.UtcNow),
            DepartmentPosition = newPositionIds.Select(positionId => new DepartmentPosition
            {
                DepartmentId = id,
                PositionId = positionId
            }).ToList()
        };
    }

    public static DepartmentChangeDto ToDepartmentChangeDto(this Department department)
    {
        return new(
            department.Id,
            department.Name,
            department.CreatedTime,
            department.UpdatedTime,
            department.DepartmentPosition?.Select(dp => dp.PositionId).ToList() ?? []
        );
    }
    public static DepartmentDto ToDepartmentDto(this Department department)
    {
        var positionStrings = department.DepartmentPosition
            ?.Select(dp => dp.Position?.Name)
            .ToList() ?? []; // Handle nullability for positions

        var employeeStrings = department.Employee
            ?.Select(e => $"{e.First_name} {e.Last_name}")
            .ToList() ?? []; // Handle nullability for employees


        return new(
            department.Id,
            department.Name,
            department.CreatedTime,
            department.UpdatedTime,
            department.Employee?.Select(e => e.Id).ToList() ?? [],
            department.DepartmentPosition?.Select(dp => dp.Position?.Id).ToList() ?? [],
            employeeStrings,
            positionStrings
        );
    }



}
