

export interface Department {
    id: string
    name: string
    createdTime: string
    updatedTime: string
    employeeIds: string[]
    positionIds: string[]
    employees: string[]
    positions: string[]
  }

export interface DepartmentCreate {
  name: string
  positionIds: string[]
}

export interface DepartmentUpdate {
  id: string
  name: string
  positionIds: string[]
}
