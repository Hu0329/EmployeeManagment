import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardMeta, CardDescription, Button, 
    Table, TableHeader, TableRow,TableHeaderCell,TableBody,TableCell} from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../layout/LoadingComponent";


 function EmployeeDetail () { 
    const {employeeStore} = useStore();
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate()
    useEffect(() => {
        id ? employeeStore.selectEmployeeDetails(id) : null;
    }, [employeeStore, id]);

    const {selectedEmployee, loaded,deleteEmployee} = employeeStore

   const  handleDelete= async ()=> {
        await deleteEmployee(selectedEmployee?.employeeDto.id as string);
        navigate('/');
    }

    return (
        <>
        <div className="backButton" >
            <Button floated="right"color="blue" as={Link} to="/">Back</Button>
        </div>
        <div className="employee-detail">
            {!loaded ?( 
            <>
            <div>
                <Card >
                    <CardContent>
                        <CardHeader>{selectedEmployee?.employeeDto.first_name} {selectedEmployee?.employeeDto.last_name}</CardHeader>
                        <CardMeta>{selectedEmployee?.employeeDto.department}</CardMeta>
                        <CardDescription>
                        {selectedEmployee?.employeeDto.position}
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <div className='ui two buttons'>
                        <Button basic color='green' as={Link} to={`/employees/${selectedEmployee?.employeeDto.id}/edit`}>
                            Edit
                        </Button>
                        <Button basic color='red' onClick={handleDelete}>
                            Delete
                        </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Table celled color="blue" size="large">
                <TableHeader>
                <TableRow>
                    <TableHeaderCell colSpan='5'>Position Track</TableHeaderCell>
                </TableRow>
                </TableHeader>
                
                <TableBody>
                {selectedEmployee?.positionTrackDtos.map(positionTrack => ( // Updated property name here
                <TableRow key={positionTrack.id} className="action-column">
                    <TableCell>{positionTrack.first_name} {positionTrack.last_name}</TableCell>
                    <TableCell>{positionTrack.position}</TableCell>
                    <TableCell>{positionTrack.department}</TableCell>
                    <TableCell>{positionTrack.timeStamp}</TableCell>
                    <TableCell>{positionTrack.action}</TableCell>
                </TableRow>
                ))}
                </TableBody>
                </Table>
             </div>   
             </> ):(<LoadingComponent inverted={true} content='Loading employees details...'/> ) }  
        </div>
        
        </>
    )
}

export default observer(EmployeeDetail);