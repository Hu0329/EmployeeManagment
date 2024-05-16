namespace EmployeeManagement.Api;

public static class PositionMapping
{
    public static Position ToEntity(this CreatePositionDto position)
    {
        return new Position()
        {
            Name = position.Name,
            CreatedTime = DateOnly.FromDateTime(DateTime.UtcNow),
            DepartmentPosition =
                position.DepartmentIds.Select(departmentId =>
                                                new DepartmentPosition
                                                { DepartmentId = departmentId }
                                                ).ToList()
        };

    }
    public static PositionDto ToPositionDto(this Position position)
    {
        return new(
            position.Id,
            position.Name,
            position.CreatedTime,
            position.Employee?.Select(e=>e.Id).ToList() ?? [],
            position.DepartmentPosition?.Select(dp => dp.DepartmentId).ToList() ?? []
        );
    }

}