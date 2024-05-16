import { action, makeAutoObservable, runInAction} from "mobx";
import { Employee, EmployeeCreate, EmployeeResponse, EmployeeUpdate} from '../models/employee';
import agent from "../api/agent";

export default class EmployeeStore {
   employees: Employee[]=[];
   employeeResponse: EmployeeResponse[]=[];
   filteredEmployees: Employee[] = [];
   selectedEmployee: EmployeeResponse | undefined = undefined;
   updatedEmployee: EmployeeUpdate []=[];
   loaded = false;
   loadingInitial = false;


    constructor() {
       makeAutoObservable(this, {
        selectEmployeeDetails: action.bound, // Bind action to class instance
         setLoaded: action,
         setLoadingInitial: action,
         setSelectedEmployee: action,
       })
    }

    loadEmployees = async () => {
        this.setLoadingInitial(true);
        try {
            const employees = await agent.Employees.list();
            this.employees = employees;
            this.setLoadingInitial(false);
            
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    


    selectEmployeeDetails = async (id: string) => {
        this.setLoaded(true);
        try{
          const response = await agent.Employees.details(id);
          this.selectedEmployee = response;
          this.setLoaded(false);
        }catch (error){
            console.log(error);
            this.setLoaded(false);
        }
       
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;       
    }

    setLoaded = (state: boolean) => {
        this.loaded = state;       
    }

    setSelectedEmployee = (employee: EmployeeResponse) => {
        this.selectedEmployee = employee;
    };

    createEmployee = async (employee: EmployeeCreate) => {
        this.loaded = true;
        try {
            await agent.Employees.create(employee);
            
            runInAction(()=>{
                const employees = agent.Employees.list(); 
                this.loaded = false;
            })
        } catch (error){
            console.log(error);
            runInAction(()=>{
                this.loaded = false;
            })

        }
    }
    updateEmployee = async (employee: EmployeeUpdate) => {
        this.loaded = true;
        try {
            await agent.Employees.update(employee);
            runInAction(()=>{
                const updateEmployee = {...this.selectedEmployee!, employeeDto: {
                    ...this.selectedEmployee!.employeeDto,
                    ...employee, // Update the employeeDto part with the new employee data
                }};
                this.selectedEmployee = updateEmployee;
                this.loaded = false;
            })
        } catch (error){
            console.log(error);
            runInAction(()=>{
                this.loaded = false;
            })

        }
    }

    deleteEmployee = async (id) => {
        this.loaded = true;
        try {
            await agent.Employees.delete(id);

            runInAction(()=>{
                this.employees=[...this.employees.filter(e=>e.id !== id)]
                this.loaded = false;
            })
        }catch(error){
            runInAction(()=>{
                this.loaded = false;
            })
        }
    }

    filterEmployeesByDepartment = (departmentName: string) => {
        if (departmentName === 'all') {
            this.filteredEmployees = this.employees; // Show all employees if 'all' department is selected
        } else {
            this.filteredEmployees = this.employees.filter(employee => employee.department === departmentName);
        }
    }

}