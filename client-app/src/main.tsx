import React from 'react'
import {RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import "./layout/styles.css"
import { router } from './router/Routes';
import { StoreContext, store } from './stores/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value ={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
