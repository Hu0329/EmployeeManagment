namespace EmployeeManagement.Api;

public record class DepartmentChangeDto(int Id, string Name, DateOnly CreatedTime, DateOnly UpdatedTime,
    List<int> PositionIds
);
