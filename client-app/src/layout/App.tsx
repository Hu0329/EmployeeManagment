import React, { Fragment } from 'react';
import { useEffect } from 'react'
import NavBar from './NavBar';
import { Container} from 'semantic-ui-react';
import LoadingComponent from './LoadingComponent';
import { Outlet } from 'react-router-dom';
import {useStore} from "../stores/store"
import { observer } from 'mobx-react-lite';

function App() { 
  const {employeeStore} = useStore();
  // const [selectedEmployee, setSelectedEmployee] = useState<Activity! undefined>(undefined);
//  function handleSelectEmployee(id: number) {
//   setSelectedEmployee(employees.find(e=> e.id === id));   
    useEffect(() => {
        // Fetch employees when the component mounts
       const fetchEmployee = async() => await employeeStore.loadEmployees();
       fetchEmployee();
    }, [employeeStore]);
    if (employeeStore.loadingInitial) {
        return <LoadingComponent inverted={true} content='Loading employees...' />;
      }
  return (
    <Fragment>
      <NavBar/>
      <Container style ={{marginTop: '7rem'}}>
        <Outlet/>
      </Container>
    </Fragment>
  )
}

export default observer(App)
