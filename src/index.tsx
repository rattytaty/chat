import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./lib/configs/router";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./lib/configs/theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<ChakraProvider theme={theme}>
            <RouterProvider router={router} fallbackElement={<>Loading</>}/>
    </ChakraProvider>)


