import React, {useEffect, useState} from 'react';
import {Box, Input, InputGroup, InputLeftAddon, InputRightAddon, useColorModeValue} from "@chakra-ui/react";
import {MessagesBlock} from "./MessagesBlock";
import {ArrowForwardIcon, AttachmentIcon} from "@chakra-ui/icons";

import {DialogInfo} from "./DialogInfo";
import {useDialogStore} from "../../lib/hooks/useDialogStore";
import {arrayUnion, doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../../lib/configs/firebase";
import {useUserStore} from "../../lib/hooks/useUserStore";
import {previewInfo} from "../SideBar/SideBar";

type message = {}

type dialogType = {
    createdAt: string
    messages: message[]
}

export const ChatMainBlock: React.FC = React.memo(() => {

    const {user} = useUserStore()

    const [messageText, setMessageText] = useState("")
    const [img, setImg] = useState<File | null>(null)
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')
    const {dialogId, receiverUser} = useDialogStore()
    const [dialog, setDialog] = useState<dialogType>()

    useEffect(() => {
        if (!dialogId) return
        const unSub = onSnapshot(doc(db, "dialogs", dialogId!), (res) => {
            setDialog(res.data() as dialogType)
        })
        return () => unSub()
    }, [dialogId]);

    const sendMessage = async () => {
        if (!messageText) return
        try {
            await updateDoc(doc(db, "dialogs", dialogId!), {
                messages: arrayUnion({
                    senderId: user?.id,
                    text: messageText,
                    sendingTime: new Date()
                })
            })

            const userDialogsRef = doc(db, "userDialogs", user!.id)
            const userDialogsSnap = await getDoc(userDialogsRef)
            if (userDialogsSnap.exists()) {
                const userDialogsData = userDialogsSnap.data().dialogs as previewInfo[]
                const dialogIndex = userDialogsData.findIndex(c => c.dialogId === dialogId)
                userDialogsData[dialogIndex].lastMessage = messageText
                userDialogsData[dialogIndex].isRead = true
                userDialogsData[dialogIndex].updatedAt = Date.now()
                await updateDoc(userDialogsRef, {
                    dialogs: userDialogsData,
                })
            }

            const receiverDialogsRef = doc(db, "userDialogs", receiverUser!.id)
            const receiverDialogsSnap = await getDoc(receiverDialogsRef)
            if (receiverDialogsSnap.exists()){
                const receiverDialogsData = receiverDialogsSnap.data().dialogs as previewInfo[]
                const  dialogIndex = receiverDialogsData.findIndex(c=>c.dialogId === dialogId)
                receiverDialogsData[dialogIndex].lastMessage = messageText
                receiverDialogsData[dialogIndex].isRead = false
                receiverDialogsData[dialogIndex].updatedAt = Date.now()
                await  updateDoc(userDialogsRef, {
                    dialogs:receiverDialogsData,
                })
            }

            setMessageText("")
        } catch (error) {

        }

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
