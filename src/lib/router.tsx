import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "../Components/Pages/LoginPage";
import {RegisterPage} from "../Components/Pages/RegisterPage";
import {Layout} from "../Components/Pages/Layout";
import SettingsPage from "../Components/Pages/SettingsPage";
import {ChatMainBlock} from "../Components/ChatMainBlock/ChatMainBlock";

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