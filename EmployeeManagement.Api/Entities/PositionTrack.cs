namespace EmployeeManagement.Api;

public class PositionTrack
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public int PositionId { get; set; }
    public int DepartmentId { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Action { get; set; }


    public Employee? Employee { get; set; }
    public Position? Position { get; set; }
    public Department? Department { get; set; }
}
