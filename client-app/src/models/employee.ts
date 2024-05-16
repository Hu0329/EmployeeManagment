export interface Employee {
    id: string
    first_name: string
    last_name: string
    position: string
    department: string
}
export interface PositionTrack {
    id: string
    first_name: string
    last_name: string
    position: string
    department: string
    timeStamp: string
    action: string
  }

export interface EmployeeResponse {
    employeeDto: Employee;
    positionTrackDtos: PositionTrack[];
  }

export interface EmployeeUpdate {
    id:string
    first_name: string
    last_name: string
    positionId: string
    departmentId: string
}

export interface EmployeeCreate {
  first_name: string
  last_name: string
  positionId: string
  departmentId: string
}