namespace EmployeeManagement.Api;

public record class PositionDto(int Id, string Name, DateOnly CreatedTime, List<int> EmployeeIds, List<int> DepartmentIds);
