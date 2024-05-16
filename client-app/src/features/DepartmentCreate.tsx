import React, { ChangeEvent, useEffect, useState } from "react";
import { FormField, Form, Button, Header, Select } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface Department {
  name: string;
  positionIds: string[];
}

function DepartmentCreate() {
  const { departmentStore, positionStore } = useStore();
  const { createDepartment } = departmentStore;
  const { positions, loadPositions } = positionStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadPositions();
  }, [loadPositions]);

  const [createdDepartment, setCreatedDepartment] = useState<Department>({
    name: "",
    positionIds: [],
  });

  const [selectedPosition, setSelectedPosition] = useState<string | undefined>("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setCreatedDepartment({ ...createdDepartment, [name]: value });
  }

  function handleSavePosition(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    if (selectedPosition && !createdDepartment.positionIds.includes(selectedPosition)) {
      setCreatedDepartment({
        ...createdDepartment,
        positionIds: [...createdDepartment.positionIds, selectedPosition],
      });
      setSelectedPosition(""); // Reset selectedPosition after adding
    }
  }

  function handleSubmit() {
    createDepartment(createdDepartment);
    // Reset the form after submission
    setCreatedDepartment({
      name: "",
      positionIds: [],
    });
    navigate("/departments")

  }

  const positionIDs = positions.map((position) => ({
    key: position.id,
    text: position.name,
    value: position.id,
  }));

  function getSelectedPositionNames(): string {
    return createdDepartment.positionIds
      .map((positionId) => {
        const position = positions.find((pos) => pos.id === positionId);
        return position ? position.name : "";
      })
      .filter((name) => name !== "")
      .join(", ");
  }

  return (
    <>
      <Header as="h1" color="blue">
        Create a New Department
      </Header>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormField>
          <label>Name</label>
          <input
            placeholder="Name"
            value={createdDepartment.name}
            name="name"
            onChange={handleInputChange}
          />
        </FormField>
        <div className="department-addposition">
          <FormField
            fluid
            clearable
            control={Select}
            label="Position"
            options={positionIDs}
            placeholder="Select Department"
            value={selectedPosition}
            onChange={(event, data) => setSelectedPosition(data.value as string)}
          />
          <Button primary onClick={handleSavePosition}>
            Add Position
          </Button>
          <Header as="h3">Selected Positions: {getSelectedPositionNames()}</Header>
        </div>
        <Button type="submit" primary>
          Submit
        </Button>
        <Button as={Link} to={`/departments`} color="grey" floated="right">
          Back
        </Button>
      </Form>
    </>
  );
}

export default observer(DepartmentCreate);