using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Api;

public record class CreateDepartmentDto(
    [Required][StringLength(50)] string Name,
    [Required]DateOnly CreatedTime,
    DateOnly UpdatedTime,
    List<int> PositionIds,
    ICollection<DepartmentPosition> DepartmentPosition
);
