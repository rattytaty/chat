import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {ChatsPage} from "./Pages/ChatsPage";
import {Layout} from "./Pages/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        //errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <ChatsPage/>
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/register",
                element: <RegisterPage/>,
            }
        ]
    }
])