import React, {useContext, useEffect, useState} from 'react';
import {SelectedUserContext} from "../hooks/selectedUserContext";


import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import {useUser} from "../hooks/useUser";

type msg = {
    date:{seconds:number
    nanoseconds:number}
    id:string
    msgText: string
    senderId: string
}

export const MessagesBlock = () => {

    const {state} = useContext(SelectedUserContext)
    const [messages, setMessages] = useState<msg[]>([])
const user = useUser()
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", state.chatId as string), (doc) => {
            doc.exists() && setMessages(doc.data().messages as msg[])
        })
        return () => unSub()
    }, []);

    return <div className="messages">
        {messages.map(message =>
            <>{
                user!.uid===message.senderId
                    ? <div className="message">
                        <div className="message-right">
                            <p className="message-content">{message.msgText}</p>
                        </div>
                        <div className="messageInfo">
                            <img className="photo" alt="photo"
                                 src={"https://www.readersdigest.ca/wp-content/uploads/2017/08/being-a-good-person.jpg"}/>
                            <span>13:37</span>
                        </div>
                    </div>
            : <div className="message">
                        <div className="messageInfo">
                            <img className="photo" alt="photo"
                                 src={"https://www.readersdigest.ca/wp-content/uploads/2017/08/being-a-good-person.jpg"}/>
                            <span>13:37</span>
                        </div>
                        <div className="message-left">
                            <p className="message-content">{message.msgText}</p>
                        </div>
                    </div>
            }</>)


        }
    </div>
};
