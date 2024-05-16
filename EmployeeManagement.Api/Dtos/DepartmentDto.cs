namespace EmployeeManagement.Api;

public record class DepartmentDto(int Id, string Name, DateOnly CreatedTime, DateOnly UpdatedTime,
    List<int> EmployeeIds,
    List<int?> PositionIds,
    List<string> Employees,
    List<string?> Positions
);
