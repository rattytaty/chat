import React, {useEffect} from 'react';
import {SideBar} from "../Components/SideBar";
import {Chats} from "../Components/Chats";
import {useUser} from "../useUser";
import {useNavigate} from "react-router-dom";

export const ChatsPage = () => {

    const user = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user]);

    return <div className="chatsPage">
        <SideBar/>
        <Chats/>
    </div>
};