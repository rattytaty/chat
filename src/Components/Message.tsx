import React, {useContext} from 'react';
import {message} from './MessagesBlock';
import anonUser from '../accets/anonUser.svg'
import {useUser} from "../hooks/useUser";
import {SelectedUserContext} from "../hooks/selectedUserContext";

export const Message = (props: {
    type: "left" | "right", message: message
}) => {

    const user = useUser()
    const {state} = useContext(SelectedUserContext)

    return <div className="message">
        {props.type==="left"&& <div className="messageInfo">
            <img className="photo" alt="photo"
                 src={(props.message.senderId === user!.uid
                     ? user!.photoURL
                     : state.chatUser.photoUrl) || anonUser
                 }/>
            <span>{props.message.date.seconds}</span>
        </div>}
        <div className={`message-${props.type}`}>
            <p className="message-content">{props.message.msgText}</p>
        </div>
        {props.type==="right"&& <div className="messageInfo">
            <img className="photo" alt="photo"
                 src={(props.message.senderId === user!.uid
                     ? user!.photoURL
                     : state.chatUser.photoUrl) || anonUser
                 }/>
            <span>{props.message.date.seconds}</span>
        </div>}
    </div>
};
