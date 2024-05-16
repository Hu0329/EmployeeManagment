namespace EmployeeManagement.Api;

public record class DepartmentPositionDto(int DepartmentId, Department? Department, int PositionId, Position? Position);
