namespace EmployeeManagement.Api;

public record class EmployeeSummaryDto(
    int Id, string First_name, string Last_name, string Position, string Department
);

