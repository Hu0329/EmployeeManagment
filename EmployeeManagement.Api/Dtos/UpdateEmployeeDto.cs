using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Api;

public record class UpdateEmployeeDto(
    [Required][StringLength(50)] string First_name,
    [Required][StringLength(50)] string Last_name,
    [Required] int PositionId,
    [Required] int DepartmentId
);
