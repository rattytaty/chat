import React, {useEffect, useState} from 'react';

import {Box, Flex, useDisclosure} from "@chakra-ui/react";
import {SidebarDrawer} from "./Drawer/Drawer";
import {InputForUserSearch} from "./InputForUserSearch";
import {doc, getDoc, onSnapshot} from 'firebase/firestore';
import {db} from "../../lib/configs/firebase";
import {user, useUserStore} from "../../lib/hooks/useUserStore";
import {FoundUsersBlock} from "./FoundUsersBlock";
import {DialogPreviewsBlock} from './DialogPreviewsBlock';
import {message} from "../ChatMainBlock/ChatMainBlock";
import {dbCollections} from "../../lib/configs/dbCollections";

export type previewInfo = {
    dialogId: string
    lastMessage: message
    receiverId: string
    isRead:boolean
}

export type dialogPreview = {
    previewInfo: previewInfo
    dialogUser: user
}

export const SideBar = () => {
    const {user} = useUserStore()
    const [foundUsers, setFoundUsers] = useState<user[]>([])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [dialogPreviews, setDialogPreviews] = useState<dialogPreview[]>([])

    useEffect(() => {
        const unsub = user && onSnapshot(doc(db, dbCollections.USERDIALOGS, user.id), async (response) => {
            if (response.exists()) {
                const previewsInfo = response.data().dialogs as previewInfo[]
                const promises = previewsInfo.map(async (previewInfo) => {
                    const dialogUserDocRef = doc(db, dbCollections.USERS, previewInfo.receiverId)
                    const dialogUserDocSnap = await getDoc(dialogUserDocRef)
                    const dialogUser = dialogUserDocSnap.data() as user
                    return {previewInfo, dialogUser}
                })
                const dialogsPreviewData = await Promise.all(promises)
                setDialogPreviews(dialogsPreviewData.sort((a,b)=>b.previewInfo.lastMessage.sendingTime-a.previewInfo.lastMessage.sendingTime))
            }
        })
        return () => {
            if (unsub) unsub()
        }
    }, [user]);

    return <Box borderRightWidth="1px"
                borderRightColor="borders"
                bg="secondaryBg"
                h="100vh">
        <Flex px={3}
              py={2}
              alignItems="center"
              gap={4}
              h="60px">
            <SidebarDrawer isOpen={isOpen}
                           onClose={onClose}
                           onOpen={onOpen}/>
            <InputForUserSearch setFoundUsers={setFoundUsers}/>
        </Flex>
        <Box style={{scrollbarWidth: "thin"}}
             overflowY="auto"
             overflowX="hidden">
            <FoundUsersBlock  foundUsers={foundUsers}/>
            <DialogPreviewsBlock dialogPreviews={dialogPreviews}/>
        </Box>
    </Box>
};
