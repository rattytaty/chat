import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {SelectedUserContextProvider} from "./hooks/selectedUserContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <SelectedUserContextProvider>
        <RouterProvider router={router} fallbackElement={<></>}/>
    </SelectedUserContextProvider>
);


