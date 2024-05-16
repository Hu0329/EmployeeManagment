import React, { useEffect } from "react";
import { useStore } from "../stores/store"
import {  Header,Button} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate} from "react-router-dom";
import LoadingComponent from "../layout/LoadingComponent";

function DepartmentPage () {
    const {departmentStore} = useStore();
    const {departments, loaded, deleteDepartment,loadDepartments} = departmentStore;
    const navigate = useNavigate();
    useEffect(()=>{
        departmentStore.loadDepartments();
    },[departmentStore]);
    async function handleDelete(id:string){
        await deleteDepartment(id)
        await loadDepartments();
        navigate('/departments')
    }
    return (
        <>
        {!loaded?(
        <div>
            <Button primary floated="right" as={Link} to={'/departments/create'}>+ Add New Department</Button>
            <Button primary floated="right" as={Link} to={'/positions/create'}>+ Add New Position</Button>
            <Header as="h1"> Department </Header>
            <div className="department-layout">
                {departments.map((department)=> (
                    <div key={department.id} >
                        <h2 >{department.name}</h2>
                        <p>{department.updatedTime}</p>
                        <Link to={`/departments/${department.id}`}><button>View</button></Link>   
                        <button onClick={()=>handleDelete(department.id)}>Delete</button>    
                    </div>
                ))}
            </div> 
        </div>
        ):(
        <LoadingComponent inverted={true} content='Loading departments...'/> )
       }
        </>
    )
}

export default observer(DepartmentPage);