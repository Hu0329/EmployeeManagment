using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Api;

public record class CreatePositionDto(
    [Required][StringLength(50)] string Name,
    DateOnly CreatedTime,
    List<int> DepartmentIds,
    ICollection<DepartmentPosition> DepartmentPosition
);
