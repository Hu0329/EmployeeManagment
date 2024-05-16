using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Api;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Employee> Employee { get; set; }
    public DbSet<Department> Department { get; set; }
    public DbSet<Position> Position { get; set; }
    public DbSet<DepartmentPosition> DepartmentPosition { get; set; }
    public DbSet<PositionTrack> PositionTrack { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Position)
            .WithMany(e => e.Employee)
            .HasForeignKey(e => e.PositionId)
            .IsRequired();

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(e => e.Employee)
            .HasForeignKey(e => e.DepartmentId)
            .IsRequired();

        modelBuilder.Entity<DepartmentPosition>()
           .HasKey(dp => new { dp.DepartmentId, dp.PositionId });

        modelBuilder.Entity<DepartmentPosition>()
            .HasOne(dp => dp.Department)
            .WithMany(d => d.DepartmentPosition)
            .HasForeignKey(dp => dp.DepartmentId);

        modelBuilder.Entity<DepartmentPosition>()
            .HasOne(dp => dp.Position)
            .WithMany(p => p.DepartmentPosition)
            .HasForeignKey(dp => dp.PositionId);

        modelBuilder.Entity<PositionTrack>()
           .HasOne(pt => pt.Employee)
           .WithMany(pt => pt.PositionTrack)
           .HasForeignKey(pt => pt.EmployeeId);

        modelBuilder.Entity<PositionTrack>()
            .HasOne(pt => pt.Position)
            .WithMany()
            .HasForeignKey(pt => pt.PositionId);

        modelBuilder.Entity<PositionTrack>()
            .HasOne(pt => pt.Department)
            .WithMany()
            .HasForeignKey(pt => pt.DepartmentId);
    }
}
