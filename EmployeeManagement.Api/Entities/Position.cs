namespace EmployeeManagement.Api;

public class Position
{

    public int Id { get; set; }
    public required string Name { get; set; }
    public DateOnly CreatedTime { get; set; }
    public ICollection<Employee> Employee { get; set; } = [];
    public List<DepartmentPosition>? DepartmentPosition { get; set; }

}
