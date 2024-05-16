import { action, makeAutoObservable, runInAction} from "mobx";
import { Department, DepartmentCreate, DepartmentUpdate } from '../models/department';
import agent from "../api/agent";
export default class DepartmentStore {
    departments: Department[]=[];
    selectedDepartment: Department;
    updatedDepartment: DepartmentUpdate;
    editMode = false;
    loaded = false;


    constructor() {
       makeAutoObservable(this, {
       })
    }
    
    loadDepartments = async () => {
        this.setLoaded(true);
        try {
            const departments = await agent.Departments.list();
            runInAction(()=>{
                this.departments = departments;
                this.setLoaded(false)
            })    
        } catch (error) {
            console.log(error);
            this.setLoaded(false)
        }
    }

    selectDepartment = async (id: string) => {
        this.setLoaded(true);
        this.setEditMode(false);
        try{
            const response = await agent.Departments.details(id);
            runInAction(()=>{
                this.selectedDepartment = response;
                this.setLoaded(false)
            })
            
        }catch (error){
            console.log(error);
            this.setLoaded(false);
        }
    }
    
    setLoaded = (state: boolean) => {
        this.loaded = state;       
    }
    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    updateDepartment = async (id: string, name: string, positionIds: string[]) => {
        this.setLoaded(true);
        try {
            const response = await agent.Departments.update(id, name, positionIds);
            await this.selectDepartment(id);
            this.setEditMode(false);
            this.setLoaded(false);
        } catch (error) {
            console.log(error);
            this.setLoaded(false);
            throw new Error("Error updating department.");
        }
    }

    createDepartment = async (department: DepartmentCreate) =>{
        this.loaded = true;
        try {
            await agent.Departments.create(department);
            
            runInAction(()=>{
                agent.Departments.list(); 
                this.loaded = false;
            })
        } catch (error){
            console.log(error);
            runInAction(()=>{
                this.loaded = false;
            })

        }
    }

    deleteDepartment = async (id) => {
        this.loaded = true;
        try {
            await agent.Departments.delete(id);

            runInAction(()=>{
                
                this.loaded = false;
            })
        }catch(error){
            runInAction(()=>{
                this.loaded = false;
            })
        }
    }

    deletePosition = async (departmentId: string, positionId: string) => {
        this.loaded = true;
        try {
            const department = this.selectedDepartment;
            const updatedPositions = department.positionIds.filter((id) => id !== positionId);
            
            await agent.Departments.update(departmentId, department.name, updatedPositions);
    
            // Update the department's positions in the store after deletion
            this.selectedDepartment.positionIds = updatedPositions;
            this.selectedDepartment.positions= this.selectedDepartment.positions.filter(
                (position) => position !== positionId
            );
    
            runInAction(() => {
                this.loaded = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loaded = false;
            });
        }
    };


}