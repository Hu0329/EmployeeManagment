namespace EmployeeManagement.Api;

public record class EmployeeDetailDto(
    int Id, string First_name, string Last_name, int PositionId, int DepartmentId
);
