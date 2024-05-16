using System.ComponentModel.DataAnnotations;


namespace EmployeeManagement.Api;

public record class UpdateDepartmentDto(
    [Required][StringLength(50)] string Name,
    [Required] DateOnly CreatedTime,
    [Required] DateOnly UpdatedTime,
    List<int> PositionIds
);
