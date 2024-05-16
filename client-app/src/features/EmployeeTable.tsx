import React, { Fragment, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Header, Input, Button, Select, DropdownProps, FormField } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";

function EmployeeTable() {
  const { employeeStore, departmentStore } = useStore();
  const { employees,filteredEmployees } = employeeStore;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    departmentStore.loadDepartments()
    if (selectedDepartment) {
      filterEmployeesByDepartment(selectedDepartment);
    } else {
      employeeStore.filteredEmployees = employeeStore.employees; 
    }
    
  }, [selectedDepartment]);

  const filterEmployeesByDepartment = async (departmentName: string) => {
    await employeeStore.filterEmployeesByDepartment(departmentName);
  };

  const toggleSort = (criteria: string) => {
    if (criteria === sortCriteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortDirection("asc");
    }
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const compareValue = sortDirection === "asc" ? 1 : -1;
    if (sortCriteria === "first_name") {
      return compareValue * a.first_name.localeCompare(b.first_name);
    } else if (sortCriteria === "last_name") {
      return compareValue * a.last_name.localeCompare(b.last_name);
    }
    return 0;
  });

  const filteredAndSortedEmployees = sortedEmployees.filter(
    (employee) =>
      employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDepartmentChange = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setSelectedDepartment(data.value as string);
  };

  return (
    <Fragment>
      <div className="employee-search">
        <Header as="h1" color="blue">
          Employee Table
        </Header>
        <Input
          icon={{ name: "search", circular: true, link: true }}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="employee-search">
    
      <Header as="h2" color="blue">
        <Button
          icon={sortDirection === "asc" ? "sort alphabet ascending" : "sort alphabet descending"}
          onClick={() => toggleSort("first_name")}
          content="Sort by First Name"
        />
        <Button
          icon={sortDirection === "asc" ? "sort alphabet ascending" : "sort alphabet descending"}
          onClick={() => toggleSort("last_name")}
          content="Sort by Last Name"
        />
      </Header>
      <FormField 
          clearable 
          control={Select}
          placeholder="Filter by Department"
          options={departmentStore.departments.map((dept) => ({
            key: dept.id,
            value: dept.name,
            text: dept.name,
          }))}
          onChange={handleDepartmentChange}
          value={selectedDepartment}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedEmployees.map((employee) => (
            <tr key={employee.id} className="action-column">
              <td>{employee.id}</td>
              <td>
                {employee.first_name} {employee.last_name}
              </td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <Button primary as={Link} to={`/employees/${employee.id}`}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="create-new">
        <Button floated="right" color="green" as={Link} to={"/employees/create"}>
          + New Employee
        </Button>
      </div>
    </Fragment>
  );
}

export default observer(EmployeeTable);