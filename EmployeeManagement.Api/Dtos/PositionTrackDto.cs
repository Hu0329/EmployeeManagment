namespace EmployeeManagement.Api.Dtos
{
    public record class PositionTrackDto(int Id, string First_name, string Last_name, string Position, string Department, DateTime TimeStamp, string Action);

}