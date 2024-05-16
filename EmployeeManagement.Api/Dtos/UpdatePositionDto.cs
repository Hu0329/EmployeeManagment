using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Api;

public record class UpdatePositionDto(
    [Required][StringLength(50)] string Name,
    [Required] DateOnly CreatedTime,
    List<int> DepartmentIds
);
