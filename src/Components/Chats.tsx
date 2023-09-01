import React, {useContext} from 'react';
import {MessagesBlock} from "./MessagesBlock";
import {SelectedUserContext} from "../hooks/selectedUserContext";
import anonUser from '../accets/anonUser.svg'

export const Chats = () => {

    const {state} = useContext(SelectedUserContext)

    return <div className="chats">
        <div className="chatInfo">
            <div className="userInfo">
                <img className="userImg"
                     src={state.chatUser.photoUrl?state.chatUser.photoUrl:anonUser}/>
                <span>{state.chatUser.displayName}</span>
            </div>

            <button className="primaryButton">change</button>
        </div>
        <MessagesBlock/>
        <div className="inputBlock">
            <div className="inputContainer">
                <button className="primaryButton">Attach</button>
                <input placeholder="Write down a message..."/>
            </div>
            <button className="primaryButton">Send</button>
        </div>
    </div>
};