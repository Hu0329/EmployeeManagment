namespace EmployeeManagement.Api;

public class Department
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public DateOnly CreatedTime { get; set; }
    public DateOnly UpdatedTime { get; set; }
    public ICollection<Employee> Employee { get; set; } = [];
    public List<DepartmentPosition>? DepartmentPosition { get; set; }

}
