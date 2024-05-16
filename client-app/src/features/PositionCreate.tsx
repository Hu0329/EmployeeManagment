import { observer } from "mobx-react-lite";
import React, {useState, ChangeEvent, useEffect} from "react";
import { useStore } from "../stores/store";
import { Header, Form, FormField, Input, Button, Select } from "semantic-ui-react";
import { PositionCreate } from "../models/position";
import { Link, useNavigate } from "react-router-dom";

function PositionCreate() {
    const {positionStore, departmentStore}  = useStore();
    const {positions, createPosition}  = positionStore;
    const {departments, loadDepartments} = departmentStore;
    const navigate = useNavigate();
    useEffect(() => {
        loadDepartments();
      }, [loadDepartments]);

    const [createdPosition, setCreatedPosition] = useState<PositionCreate>({
        name: "",
        departmentIds: []
    });
    const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>("");
  
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setCreatedPosition({ ...createdPosition, [name]: value });
      }

    function handleSavePosition(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        if (selectedDepartment && !createdPosition.departmentIds.includes(selectedDepartment)) {
        setCreatedPosition({
            ...createdPosition,
            departmentIds: [...createdPosition.departmentIds, selectedDepartment],
        });
        setSelectedDepartment(""); // Reset selectedPosition after adding
        }
    }

    function handleSubmit() {
        createPosition(createdPosition);
        // Reset the form after submission
        setCreatedPosition({
        name: "",
        departmentIds: []
        });
        navigate("/departments")

    }
    const departmentIDs = departments.map((department) => ({
        key: department.id,
        text: department.name,
        value: department.id,
      }));

      function getSelectedDepartmentNames(): string {
        return createdPosition.departmentIds
          .map((departmentId) => {
            const department = departments.find((des) => des.id === departmentId);
            return department ? department.name : "";
          })
          .filter((name) => name !== "")
          .join(", ");
      }

return (
    <>
    <Header>Create a New Position</Header>
    <Form onSubmit={handleSubmit}>
        <FormField control={Input} label="Position" placeholder="New Position" name="name" onChange={handleInputChange}/>
        <div className="department-addposition">
          <FormField
            fluid
            clearable
            control={Select}
            label="Position"
            options={departmentIDs}
            placeholder="Select Department"
            value={selectedDepartment}
            onChange={(event, data) => setSelectedDepartment(data.value as string)}
          />
          <Button primary onClick={handleSavePosition}>
            Add Department
          </Button>
          <Header as="h3">Selected Departments: {getSelectedDepartmentNames()}</Header>
        </div>
        <Button type="submit" primary>
          Submit
        </Button>
        <Button as={Link} to={`/departments`} color="grey" floated="right">
          Back
        </Button>
    </Form>

    </>
)

}

export default observer(PositionCreate);