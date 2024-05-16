export interface Position {
    id: string
    name: string
    createdTime: string,
    employeeIds: string[]
    departmentIds: string[]
  }

export interface PositionCreate {
  name: string
  departmentIds: string[]
}

export interface PositionCreateInDepartment{
  name: string
}


