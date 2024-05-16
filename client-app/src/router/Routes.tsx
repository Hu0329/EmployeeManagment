import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../layout/App";

import EmployeeDetail from "../features/EmployeeDetail";
import EmployeeTable from "../features/EmployeeTable";
import EmployeeEdit from "../features/EmployeeEdit";
import EmployeeCreate from "../features/EmployeeCreate";
import DepartmentPage from "../features/Department"
import DepartmentDetail from "../features/DepartmentDetail";
import DepartmentCreate from "../features/DepartmentCreate";
import PositionCreate from "../features/PositionCreate";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {index:true, element: <EmployeeTable/>},
            {path:'/employees/:id', element: <EmployeeDetail />},
            {path:'/employees/:id/edit', element: <EmployeeEdit/>},
            {path:'/employees/create', element: <EmployeeCreate/>},
            {path: '/departments', element: <DepartmentPage />},
            {path: '/departments/:id', element: <DepartmentDetail />},
            {path: '/departments/create', element: <DepartmentCreate />},
            {path: '/positions/create', element: <PositionCreate />}

            
        ]
    }
]

export const router = createBrowserRouter(routes)