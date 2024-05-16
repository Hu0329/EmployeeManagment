import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Select } from "semantic-ui-react";
import LoadingComponent from "../layout/LoadingComponent";

function DepartmentDetail() {
    const { departmentStore, positionStore } = useStore();
    const {id} = useParams<{ id: string }>();
    const { loadDepartments, selectedDepartment, selectDepartment, updateDepartment, loaded, editMode, setEditMode } = departmentStore;
    const { positions, loadPositions } = positionStore;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (id) {
                selectDepartment(id)
                loadPositions()
         } 
    }, [id, departmentStore, positionStore]);

    const [editedName, setEditedName] = useState(selectedDepartment?.name || "");
    const [isEditingPosition, setIsEditingPosition] = useState(false);
    const [editedPosition, setEditedPosition] = useState("");
    const [error, setError] = useState("");
    const [newPositionId, setNewPositionId] = useState("");

    const handleEdit = () => {
        setEditMode(true);
        setEditedName(selectedDepartment?.name)
    };

    const handleNameSave = async () => {
        const { id, positionIds } = selectedDepartment;
        setEditedName("")
        await updateDepartment(id, editedName, positionIds). then(()=> selectDepartment(id as string))
        navigate(`/departments/${id}`);
    };

    const handleEditPosition = (positionName: string) => {
        setIsEditingPosition(true);
        setEditedPosition(positionName);
    };
    
    const handleSavePosition = async (newPositionId: string) => {
        setError(""); // Clear any previous errors
    
        // Get the positionId dynamically based on newPositionName
        const editedPositionData = positions.find((pos) => pos.name === editedPosition);
        console.log(editedPositionData)

        const editedPositionId = editedPositionData?.id;
    
        const departmentId = selectedDepartment.id;
        const updatedPositionIds = selectedDepartment.positionIds.map((positionId) =>
            positionId === editedPositionId ? newPositionId : positionId
        );
        try {
            await departmentStore.updateDepartment(departmentId, editedName, updatedPositionIds);
            await selectDepartment(departmentId); // Refresh department data after editing
            setIsEditingPosition(false); // Reset edit mode
            setEditedPosition(""); // Clear the edited position
        } catch (error) {
            setError("Error saving position. Please try again.");
            console.log(error);
        }
    };

    const handleAddPosition = async () => {
        setError(""); 
        const departmentId = selectedDepartment.id;
        const updatedPositionIds = [...selectedDepartment.positionIds, newPositionId]
        try {
            await departmentStore.updateDepartment(departmentId, editedName, updatedPositionIds);
            // Refresh the department data after updating
            await selectDepartment(selectedDepartment.id);
            // Clear the new position name and error
            setNewPositionId("");
            setError("");
        } catch (error) {
            setError("Error adding new position. Please try again.");
            console.log(error);
        }
    };

    const handleDelete = async (positionName: string) => {
        try {
            const position = positions.find((position) => position.name === positionName);
            if (!position) {
                throw new Error("Position not found");
            }
            const positionId = position.id;
            const departmentId = selectedDepartment.id;
            await departmentStore.deletePosition(departmentId, positionId);
            await selectDepartment(departmentId); // Refresh department data after deletion
        } catch (error) {
            console.log(error);
            setError("Error deleting position. Please try again.");
        }
    };
    
    return (
        <>
            <div className="backButton">
                <Button floated="right" color="blue" as={Link} to="/departments">Back</Button>
            </div>
            <div className="detail-container">
                {!loaded ? (
                    <>
                        <div className="detail-header">
                            {!editMode ? (
                                <h2>{selectedDepartment?.name}</h2>
                            ) : (
                                <Form>
                                    <Form.Field
                                        control={Input}
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                </Form>
                            )}
                            {!editMode ? (
                                <button onClick={handleEdit}>Edit</button>
                            ) : (
                                <button onClick={handleNameSave}>Save</button>
                            )}
                        </div>
                    
                        <ol key={selectedDepartment?.id}>
                            {selectedDepartment?.positions.map((positionName, index) => (
                                <li className="detail-position" key={index}> 
                                    {isEditingPosition && editedPosition === positionName ? (
                                        <Form.Field
                                        control={Select}
                                        options={positions
                                            .filter((pos) => !selectedDepartment.positionIds.includes(pos.id)) // Filter out positions already in departmentStore.positionIds
                                            .map((pos) => ({ key: pos.id, value: pos.id, text: pos.name }))
                                        }
                                        value={editedPosition}
                                        onChange={(e, data) => handleSavePosition(data.value as string)}
                                    />
                                    ) : (
                                        <>
                                            <p>{positionName}</p>
                                            <div>
                                            <button onClick={() => handleEditPosition(positionName)}>Edit</button>
                                                <button onClick={() => handleDelete(positionName)}>Delete</button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ol>
                        <div>
                        <Form.Field
                            clearable
                            control={Select}
                            options={positions
                                .filter((pos) => !selectedDepartment.positionIds.includes(pos.id)) // Filter out positions already in departmentStore.positionIds
                                .map((pos) => ({ key: pos.id, value: pos.id, text: pos.name }))
                            }
                            value={newPositionId}
                            onChange={(e, data) => setNewPositionId(data.value as string)}
                        />
                                
                        <Button floated="right" onClick={handleAddPosition}>
                                    Add New Position
                        </Button>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </>
                ) : (
                    <LoadingComponent inverted={true} content='Loading departments details...' />
                )}  
            </div>
        </>
    );
}

export default observer(DepartmentDetail);