namespace EmployeeManagement.Api;

public class Employee
{

    public int Id { get; set; }
    public required string First_name { get; set; }
    public required string Last_name { get; set; }
    public int PositionId { get; set; }
    public int DepartmentId { get; set; }

    public Position? Position { get; set; }
    public Department? Department { get; set; }
    public List<PositionTrack> PositionTrack { get; set; } = [];
}
