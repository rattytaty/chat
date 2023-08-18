import React from 'react';
import {SideBar} from "../Components/SideBar";
import {Chats} from "../Components/Chats";

export const ChatsPage = () => {
    return <div className="chatsPage">
        <SideBar/>
        <Chats/>

    </div>
};