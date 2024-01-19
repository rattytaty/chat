import React, {useContext, useEffect, useRef, useState} from 'react';
import {SelectedUserContext} from "../hooks/providers/SelectedUserContext";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import {UserContext} from "../hooks/providers/UserContext";
import {Message} from "./Message";
import {Box} from "@chakra-ui/react";

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

    const {selectedChat} = useContext(SelectedUserContext)
    const [messages, setMessages] = useState<message[]>([])
    const user = useContext(UserContext)
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", selectedChat.chatId as string), (doc) => {
            doc.exists() && setMessages(doc.data().messages as message[])
        })
        return () => unSub()
    }, [selectedChat.chatId]);
    const reference = useRef<HTMLDivElement>(null);
    useEffect(() => {
        reference.current && reference.current.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return <Box height="calc(100vh - 100px)"
                flexDirection="column"
                overscrollBehaviorY="none"
                style={{scrollbarWidth: "thin"}}
                overflowY="auto">
        {messages.map(message =>
            <Message key={message.id}
                     position={message.senderId === user!.uid ? "right" : "left"}
                     message={message}
            />)}
        <div ref={reference}></div>
    </Box>
}