import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "../Pages/LoginPage";
import {RegisterPage} from "../Pages/RegisterPage";
import {Layout} from "../Pages/Layout";
import SettingsPage from "../Pages/SettingsPage";
import {ChatMainBlock} from "../Components/ChatMainBlock";
import React from "react";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        //errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <ChatMainBlock/>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/settings",
        element: <SettingsPage/>,
    }
])