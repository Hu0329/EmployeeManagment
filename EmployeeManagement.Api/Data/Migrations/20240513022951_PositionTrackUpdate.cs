using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeManagement.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class PositionTrackUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "PositionTrack",
                newName: "Action");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "PositionTrack",
                newName: "Timestamp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "PositionTrack",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Action",
                table: "PositionTrack",
                newName: "Status");
        }
    }
}
