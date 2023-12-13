import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {ChatPage} from "./Pages/ChatPage";
import {Layout} from "./Pages/Layout";
import SettingsPage from "./Pages/SettingsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        //errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <ChatPage/>
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
        ]
    }
])