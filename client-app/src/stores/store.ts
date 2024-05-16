import { createContext, useContext } from "react";
import EmployeeStore from "./employeeStore";
import PositionStore from "./positionStore";
import DepartmentStore from "./departmentStore"
interface Store {
    employeeStore: EmployeeStore,
    positionStore: PositionStore,
    departmentStore: DepartmentStore
}

export const store:Store = {
    employeeStore: new EmployeeStore(),
    positionStore: new PositionStore(),
    departmentStore: new DepartmentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}