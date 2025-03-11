import React, {useEffect, useRef, useState} from 'react';
import {Message} from "./Message";
import {Box} from "@chakra-ui/react";
import {useUserStore} from "../../lib/hooks/useUserStore";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../lib/configs/firebase";
import {useDialogStore} from "../../lib/hooks/useDialogStore";
import {message} from "./ChatMainBlock";
import {CheckIcon, CloseIcon, DeleteIcon, PlusSquareIcon, SmallCloseIcon, SpinnerIcon} from "@chakra-ui/icons";
import {dbCollections} from "../../lib/configs/dbCollections";




export const MessagesBlock = () => {

const {dialogId} = useDialogStore()
    const [messages, setMessages] = useState<message[]>([])
    const {user} = useUserStore()

    const referenceForScroll = useRef<HTMLDivElement>(null);
    useEffect(() => {
        referenceForScroll.current && referenceForScroll.current.scrollIntoView({behavior: "smooth"});
    }, [messages]);


    useEffect(() => {
        if(!dialogId) return
       const unSub =  onSnapshot(doc(db, dbCollections.DIALOGS, dialogId), res=>{
           if (res.exists()){
               setMessages(res.data().messages as message[])
           }
       })
        return ()=>unSub()
    }, [dialogId]);

    return <Box height="calc(100vh - 100px)"
                flexDirection="column"
                overscrollBehaviorY="none"
                style={{scrollbarWidth: "thin"}}
                overflowY="auto">
        {messages.map(message =>
            <Message key={message.sendingTime+message.senderId}
                     position={message.senderId === user!.id ? "right" : "left"}
                     message={message}
            />)}
        <div ref={referenceForScroll}></div>

    </Box>
}