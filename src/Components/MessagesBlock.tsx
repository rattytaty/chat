import React, {useContext, useEffect, useRef, useState} from 'react';
import {SelectedUserContext} from "../hooks/selectedUserContext";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import {useUser} from "../hooks/useUser";
import {Message} from "./Message";

export type message = {
    date: {
        seconds: number
        nanoseconds: number
    }
    id: string
    msgText: string
    senderId: string
}

export const MessagesBlock = () => {

    const {state} = useContext(SelectedUserContext)
    const [messages, setMessages] = useState<message[]>([])
    const user = useUser()
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", state.chatId as string), (doc) => {
            doc.exists() && setMessages(doc.data().messages as message[])
        })
        return () => unSub()
    }, [state.chatId]);
    const reference = useRef<HTMLDivElement>(null);
    useEffect(() => {
        reference.current && reference.current.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return <div>
        {messages.map(message =>
            <Message key={message.id}
                     position={message.senderId === user!.uid ? "right" : "left"}
                     message={message}
            />)}
        <div ref={reference}></div>
    </div>
};
