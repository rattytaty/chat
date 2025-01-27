import React, {useEffect, useState} from 'react';

import {Avatar, Box, Divider, Flex, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {SidebarDrawer} from "./Drawer/Drawer";
import {InputForUserSearch} from "./InputForUserSearch";
import {arrayUnion, collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {db} from "../../lib/firebase";
import {user, useUserStore} from "../../hooks/useUserStore";
import {DialogPreviewPlate} from "./DialogPreviewPlate";

export type previewInfo = {
    chatId: string
    lastMessage: string
    receiverId: string
    updatedAt: number
}

export type dialogsPreview = {
    previewInfo: previewInfo
    dialogUser: user
}

export const SideBar = () => {

    const [foundUsers, setFoundUsers] = useState<user[]>([])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const selectedChatColor = useColorModeValue('#adc2ee', '#202B36')
    const chatHoverColor = useColorModeValue('#7eb2e0', '#24394e')
    const {user} = useUserStore()
    const [dialogsPreview, setDialogsPreview] = useState<dialogsPreview[]>([])

    useEffect(() => {
        const unsub = user && onSnapshot(doc(db, "userDialogs", user.id), async (response) => {
            if (response.exists()) {
                const previewsInfo = response.data().dialogs as previewInfo[]
                const promises = previewsInfo.map(async (previewInfo) => {
                    const dialogUserDocRef = doc(db, "users", previewInfo.receiverId)
                    const dialogUserDocSnap = await getDoc(dialogUserDocRef)
                    const dialogUser = dialogUserDocSnap.data() as user
                    return {previewInfo, dialogUser}
                })
                const dialogsPreviewData = await Promise.all(promises)
                setDialogsPreview(dialogsPreviewData)
            }
        })
        return () => {
            if (unsub) unsub()
        }
    }, [user]);

    const startDialog = async (foundUserId: string) => {
        const dialogRef = collection(db, "dialogs")
        const userDialogsRef = collection(db, "userDialogs")
        try {
            const newDialogRef = doc(dialogRef)
            await setDoc(newDialogRef, {
                createdAt: serverTimestamp(),
                messages: []
            })
            await updateDoc(doc(userDialogsRef, foundUserId), {
                dialogs: arrayUnion({
                    chatId: newDialogRef.id,
                    lastMessage: "",
                    receiverId: user!.id,
                    updatedAt: Date.now()
                })
            })
            await updateDoc(doc(userDialogsRef, user!.id), {
                dialogs: arrayUnion({
                    chatId: newDialogRef.id,
                    lastMessage: "",
                    receiverId: foundUserId,
                    updatedAt: Date.now()
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

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

            {foundUsers.map(foundUser => <DialogPreviewPlate  dialogUser={foundUser} onPreviewClick={() => startDialog(foundUser.id)}/>)}
            {foundUsers.length ? <Divider/> : undefined}

            {/*{dialogs.map(dialog =>
                <Flex px={2}
                      py={1}
                      bg={selectedChat.chatUser.uid === dialog[1].userInfo.uid ? selectedChatColor : undefined}
                      onClick={() => {
                      }}
                      key={dialog[0]}
                      _hover={{backgroundColor: chatHoverColor}}
                      cursor="pointer">
                    <Avatar src={dialog[1].userInfo.photoUrl ?? undefined}/>
                    <Box ml='3'>
                        <Text color="text"
                              overflow="hidden"
                              whiteSpace="nowrap"
                              width="200px"
                              textOverflow="ellipsis"
                              fontWeight="semibold">
                            {dialog[1].userInfo.displayName}
                        </Text>
                        {dialog[1].lastMessage && <Text
                            overflow="hidden"
                            whiteSpace="nowrap"
                            width="200px"
                            textOverflow="ellipsis"
                            fontSize="sm"
                            color={selectedChat.chatUser.uid === dialog[1].userInfo.uid ? "text" : "#5A6670"}>{dialog[1].lastMessage.msgText}</Text>}
                    </Box>
                </Flex>
            )}*/}


            {/* {chats && Object.entries(chats)?.sort((a, b) => (b[1].date ? b[1].date.second : 0) - (a[1].date ? a[1].date.second : 0)).map(chat =><></>
            )}*/}
        </Box>
    </Box>
};
