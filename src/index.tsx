import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {SelectedUserContextProvider} from "./hooks/providers/SelectedUserContext";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme";
import {UserContextProvider} from "./hooks/providers/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<ChakraProvider theme={theme}>
    <UserContextProvider>
        <SelectedUserContextProvider>
            <RouterProvider router={router} fallbackElement={<>Loading</>}/>
        </SelectedUserContextProvider>
    </UserContextProvider>
    </ChakraProvider>)


