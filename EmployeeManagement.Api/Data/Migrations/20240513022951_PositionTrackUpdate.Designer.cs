﻿// <auto-generated />
using System;
using EmployeeManagement.Api;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployeeManagement.Api.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240513022951_PositionTrackUpdate")]
    partial class PositionTrackUpdate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0-preview.3.24172.4");

            modelBuilder.Entity("EmployeeManagement.Api.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("UpdatedTime")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Department");
                });

            modelBuilder.Entity("EmployeeManagement.Api.DepartmentPosition", b =>
                {
                    b.Property<int>("DepartmentId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PositionId")
                        .HasColumnType("INTEGER");

                    b.HasKey("DepartmentId", "PositionId");

                    b.HasIndex("PositionId");

                    b.ToTable("DepartmentPosition");
                });

            modelBuilder.Entity("EmployeeManagement.Api.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("First_name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Last_name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("PositionId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("PositionId");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("EmployeeManagement.Api.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Position");
                });

            modelBuilder.Entity("EmployeeManagement.Api.PositionTrack", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Action")
                        .HasColumnType("TEXT");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PositionId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PositionId");

                    b.ToTable("PositionTrack");
                });

            modelBuilder.Entity("EmployeeManagement.Api.DepartmentPosition", b =>
                {
                    b.HasOne("EmployeeManagement.Api.Department", "Department")
                        .WithMany("DepartmentPosition")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmployeeManagement.Api.Position", "Position")
                        .WithMany("DepartmentPosition")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Position");
                });

            modelBuilder.Entity("EmployeeManagement.Api.Employee", b =>
                {
                    b.HasOne("EmployeeManagement.Api.Department", "Department")
                        .WithMany("Employee")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmployeeManagement.Api.Position", "Position")
                        .WithMany("Employee")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Position");
                });

            modelBuilder.Entity("EmployeeManagement.Api.PositionTrack", b =>
                {
                    b.HasOne("EmployeeManagement.Api.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmployeeManagement.Api.Employee", "Employee")
                        .WithMany("PositionTrack")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmployeeManagement.Api.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Employee");

                    b.Navigation("Position");
                });

            modelBuilder.Entity("EmployeeManagement.Api.Department", b =>
                {
                    b.Navigation("DepartmentPosition");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("EmployeeManagement.Api.Employee", b =>
                {
                    b.Navigation("PositionTrack");
                });

            modelBuilder.Entity("EmployeeManagement.Api.Position", b =>
                {
                    b.Navigation("DepartmentPosition");

                    b.Navigation("Employee");
                });
#pragma warning restore 612, 618
        }
    }
}
