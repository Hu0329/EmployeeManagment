namespace EmployeeManagement.Api;

public class DepartmentPosition
{

    public int DepartmentId { get; set; }
    public Department? Department { get; set; }
    public int PositionId { get; set; }
    public Position? Position { get; set; }
}
