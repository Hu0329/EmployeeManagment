import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form, FormField,Header, Button,DropdownProps, Select } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";

function EmployeeEdit() {
  const { employeeStore, departmentStore, positionStore } = useStore();
  const [createdEmployee, setCreatedEmployee] = useState({
    first_name: "",
    last_name:"",
    departmentId:"",
    positionId:""
});
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [positionOptions, setPositionOptions] = useState<Array<{ key: string; text: string; value: string; }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    departmentStore.loadDepartments();
    positionStore.loadPositions();
  }, [departmentStore, positionStore]);

  const departmentOptions = departmentStore.departments.map((department) => ({
    key: department.id,
    text: department.name,
    value: department.id,
  }));

  const handleDepartmentChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setSelectedDepartment(data.value as string); // Ensure data.value is of type string
    const filteredPositions = positionStore.positions.filter(
      (position) => position.departmentIds.includes(data.value as string) // Ensure data.value is of type string
    );
    setPositionOptions(
      filteredPositions.map((position) => ({
        key: position.id,
        text: position.name,
        value: position.id,
      }))
    );
    setCreatedEmployee({...createdEmployee, departmentId: data.value as string})
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    await employeeStore.createEmployee(createdEmployee).then(async ()=>{
      await employeeStore.loadEmployees();
     navigate('/');
    })
    
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
   
    const {name, value} =event.target;
    setCreatedEmployee({...createdEmployee, [name]:value})
  }

    return( 
        <>
        <Header as="h1" color="blue">Create a New Employee Record</Header>
        <Form onSubmit={handleSubmit} autoComplete="off">
        <FormField>
          <label>First Name</label>
          <input placeholder='First Name' value={createdEmployee.first_name} name="first_name" onChange={handleInputChange}/>
        </FormField>
        <FormField>
          <label>Last Name</label>
          <input placeholder='Last Name'value={createdEmployee.last_name} name="last_name" onChange={handleInputChange}/>
        </FormField>
        <FormField
            fluid
            control={Select}
            label="Department"
            options={departmentOptions}
            placeholder="Select Department"
            onChange={handleDepartmentChange}
            value={selectedDepartment}
          />
        <FormField
            fluid
            control={Select}
            label="Position"
            options={positionOptions}
            placeholder="Select Position"
            value={createdEmployee.positionId}
            onChange={(event, data) => setCreatedEmployee({...createdEmployee, positionId: data.value as string})}
            name="position"
        />


        <Button type='submit' primary>Submit</Button>
        <Button as={Link} to={`/`} color="grey" floated="right">Back</Button>
      </Form>
      </>)

}

export default observer(EmployeeEdit);