
namespace EmployeeManagement.Api;

public class Seed
{

    public static async Task SeedData(DataContext dbContext)
    {

        // var employees = new List<Employee>
        //     {
        //         new() { First_name = "John", Last_name = "Doe", PositionId = 1, DepartmentId = 1 },
        //         new() { First_name = "Jane", Last_name  = "Smith", PositionId = 2, DepartmentId = 2 },
        //         new() { First_name = "Michael", Last_name  = "Johnson", PositionId = 3, DepartmentId = 1 },
        //         new() { First_name = "Emily", Last_name  = "Williams", PositionId = 1, DepartmentId = 3 },
        //         new() { First_name = "David", Last_name  = "Brown", PositionId = 2, DepartmentId = 2 }
        //     };
        



        // var engineering = new Department { Name = "Engineering", CreatedTime = new DateOnly(2011, 01, 01), UpdatedTime = new DateOnly(2011, 11, 01) };
        // var it = new Department { Name = "IT", CreatedTime = new DateOnly(2011, 01, 01), UpdatedTime = new DateOnly(2012, 01, 01) };
        // var hr = new Department { Name = "HR", CreatedTime = new DateOnly(2011, 01, 01), UpdatedTime = new DateOnly(2011, 01, 01) };

        // var softwareEngineer = new Position { Name = "Software Engineer", CreatedTime = new DateOnly(2012, 01, 01) };
        // var projectManager = new Position { Name = "Project Manager", CreatedTime = new DateOnly(2011, 01, 01) };
        // var salesRepresentative = new Position { Name = "Sales Representative", CreatedTime = new DateOnly(2022, 01, 01) };

        // var departmentposition = new List<DepartmentPosition>
        //     {
        //         new (){ Position = softwareEngineer, Department = engineering },
        //         new (){ Position = softwareEngineer, Department = it },
        //         new () { Position = projectManager, Department = engineering },
        //         new () { Position = salesRepresentative, Department = hr }
        //     };
        // var departmentposition = new List<DepartmentPosition>
        //     {
        //         new (){ PositionId = 2, DepartmentId = 2 },
        //         new (){ PositionId = 3, DepartmentId = 1 },
        //         new () { PositionId = 1, DepartmentId = 3}
        //     };

        // Add the data to the database context and save changes
        // foreach (var dp in departmentposition)
        // {
        //     dbContext.DepartmentPosition.Add(dp);
        // }

        // using var transaction = dbContext.Database.BeginTransaction();


        // await dbContext.Employee.AddRangeAsync(employees);
        // await dbContext.Department.AddRangeAsync(engineering, it, hr);
        // await dbContext.Position.AddRangeAsync(softwareEngineer, projectManager, salesRepresentative);
        await dbContext.SaveChangesAsync();

        // try
        // {
        // transaction.Commit();
        // }
        // catch (Exception)
        // {
        //     transaction.Rollback();
        //     throw; // Handle or log the exception as needed
        // }

    }
}

