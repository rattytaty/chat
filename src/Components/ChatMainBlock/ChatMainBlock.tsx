import React, {useEffect, useState} from 'react';
import {Box, Input, InputGroup, InputLeftAddon, InputRightAddon, useColorModeValue} from "@chakra-ui/react";
import {MessagesBlock} from "./MessagesBlock";
import {ArrowForwardIcon, AttachmentIcon} from "@chakra-ui/icons";

import {DialogInfo} from "./DialogInfo";
import {useDialogStore} from "../../lib/hooks/useDialogStore";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../lib/configs/firebase";

type message = {}

type dialogType = {
    createdAt: string
    messages: message[]
}

export const ChatMainBlock: React.FC = React.memo(() => {


    const [messageText, setMessageText] = useState("")
    const [img, setImg] = useState<File | null>(null)

    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')
    const {dialogId} = useDialogStore()

    const [dialog, setDialog] = useState<dialogType>()

    useEffect(() => {

        const unSub = onSnapshot(doc(db, "dialogs", dialogId!), (res) => {
            setDialog(res.data() as dialogType)
        })
        return () => unSub()
    }, [dialogId]);

    const sendMessage = () => {
        if (!messageText) return

    }
    return <Box bg="primaryBg"
                h="100vh">
        {dialogId && <Box>
            <DialogInfo/>
            <MessagesBlock/>

            <Box display="flex"
                 alignItems="center"
                 h="40px"
                 p={1}
                 bg="secondaryBg"
                 borderTopWidth="1px"
                 borderTopColor="borders">
                <input type="file"
                       style={{display: "none"}}
                       id="file"
                       onChange={event => {
                           if (event.currentTarget.files) {
                               setImg(event.currentTarget.files[0])
                           }
                       }}/>
                <InputGroup border="none">
                    <InputLeftAddon _hover={{color: iconHoverColor}}
                                    border="none"
                                    bg="none"
                                    cursor="pointer"
                                    color="icons"
                                    children={<label htmlFor="file"><AttachmentIcon cursor="pointer"
                                                                                    boxSize={6}/></label>}/>
                    <Input border="none"
                           borderStyle="none"
                           _focusVisible={{
                               outline: "none",
                           }}
                           color="text"
                           placeholder="Write a message..."
                           value={messageText}
                           onChange={event => setMessageText(event.currentTarget.value)}
                           onKeyDown={event => event.code === "Enter" && sendMessage()}
                    />
                    <InputRightAddon onClick={sendMessage}
                                     _hover={{color: iconHoverColor}}
                                     border="none"
                                     bg="none"
                                     cursor="pointer"
                                     color="icons"
                                     children={<ArrowForwardIcon boxSize={6}/>}/>
                </InputGroup>
            </Box>
        </Box>}
    </Box>
})
