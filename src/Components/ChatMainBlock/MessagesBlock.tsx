import React, {useEffect, useRef, useState} from 'react';
import {Message} from "./Message";
import {Box} from "@chakra-ui/react";
import {useUserStore} from "../../hooks/useUserStore";

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


    const [messages, setMessages] = useState<message[]>([])
    const {user} = useUserStore()

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
                     position={message.senderId === user!.id ? "right" : "left"}
                     message={message}
            />)}
        <div ref={reference}></div>
    </Box>
}