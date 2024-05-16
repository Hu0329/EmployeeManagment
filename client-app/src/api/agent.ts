import axios, { AxiosResponse } from "axios";
import { Employee, EmployeeCreate, EmployeeResponse, EmployeeUpdate } from "../models/employee";
import { Department, DepartmentCreate, DepartmentUpdate } from "../models/department"
import { Position, PositionCreate } from "../models/position"

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = "http://localhost:5180/";

axios.interceptors.response.use(async (response) => {
    return sleep(500).then(() => {
        return response;
    }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    });
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Employees = {
    list: () => request.get<Employee[]>('/employees'),
    details: (id: string) => request.get<EmployeeResponse>(`/employees/${id}`).then((response) =>
        ({
            employeeDto: response.employeeDto,
            positionTrackDtos: response.positionTrackDtos || []
        })
    ),
    create: (employee: EmployeeCreate) => request.post<void>('/employees', employee),
    update: (employee: EmployeeUpdate) => request.put<void>(`/employees/${employee.id}/edit`, employee),
    delete: (id: string) => request.delete<void>(`/employees/${id}`)
};

const Departments = {
    list: () => request.get<Department[]>('/departments'),
    details: (id: string) => request.get<Department>(`/departments/${id}`),
    create: (department: DepartmentCreate) => request.post<void>('/departments', department),
    update: (id: string, name: string, positionIds: string[]) => request.put<void>(`/departments/${id}`,{id, name, positionIds}),
    delete: (id: string) => request.delete<void>(`/departments/${id}`)
}

const Positions = {
    list: () => request.get<Position[]>('/positions'),
    details: (id: string) => request.get<Position>(`/positions/${id}`),
    create: (position: PositionCreate) => request.post<void>('/positions', position),
    update: (position: Position) => request.put<void>(`/positions/${position.id}`, position),
    delete: (id: string) => request.delete<void>(`/positions/${id}`)
}

const agent = {
    Employees,
    Departments,
    Positions
};

export default agent;