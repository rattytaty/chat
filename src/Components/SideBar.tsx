import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../hooks/providers/UserContext";
import {db} from "../lib/firebase";
import {doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {selectedUser, SelectedUserContext} from "../hooks/providers/SelectedUserContext";
import {Avatar, Box, Divider, Flex, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {SidebarDrawer} from "./SideBar/Drawer/Drawer";
import {InputForUserSearch} from "./SideBar/InputForUserSearch";


export type foundUser = {
    displayName: string
    email: string
    uid: string
    photoUrl: string
}

interface chat {
    [key: string]: {
        date: {
            second: number
            nanoseconds: number
        }
        userInfo: selectedUser
        lastMessage: { msgText: string }
    }
}

export const SideBar = () => {

    const {selectedChat, dispatch} = useContext(SelectedUserContext)
    const user = useContext(UserContext)

    const [foundUser, setFoundUser] = useState<foundUser | null>(null)


    const selectFoundUser = async (userInfo: selectedUser) => {
        const combinedId = user!.uid > foundUser!.uid
            ? user!.uid + foundUser!.uid
            : foundUser!.uid + user!.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages: []})
                await updateDoc(doc(db, "usersChats", user!.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: foundUser!.uid,
                        displayName: foundUser!.displayName,
                        photoUrl: foundUser!.photoUrl,
                    },
                    [combinedId + ".date"]: serverTimestamp()

                })
                await updateDoc(doc(db, "usersChats", foundUser!.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user!.uid,
                        displayName: user!.displayName,
                        photoUrl: user!.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()

                })
            }
            dispatch({type: "CHANGE_USER", payload: userInfo})
        } catch (e) {
        }
        setFoundUser(null)
    }
    const [chats, setChats] = useState<chat>()
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", user!.uid), (doc) => {
                setChats(doc.data())
            })
            return () => unsub()
        }
        user?.uid && getChats()
    }, [user])

    const selectChat = (userInfo: {
        uid: string
        photoUrl: string | null
        displayName: string
    }) => {
        dispatch({type: "CHANGE_USER", payload: userInfo})
    }

    const {isOpen, onOpen, onClose} = useDisclosure()

    const selectedChatColor = useColorModeValue('#adc2ee', '#202B36')

    const chatHoverColor = useColorModeValue('#7eb2e0', '#24394e')

    return <Box borderRightWidth="1px"
                borderRightColor="borders"
                bg="secondaryBg"
                h="100vh">
        <Flex px={3}
              py={2}
              alignItems="center"
              gap={4}
              justifyContent="space-between"
              h="60px">
            <SidebarDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            <InputForUserSearch setFoundUser={setFoundUser}/>
        </Flex>
        <Box style={{scrollbarWidth: "thin"}}
             overflowY="auto"
             overflowX="hidden">
            {foundUser && <><Flex p={2}
                                  onClick={() => selectFoundUser(foundUser)}
                                  _hover={{backgroundColor: chatHoverColor}}
                                  cursor="pointer">
                <Avatar src={foundUser.photoUrl ?? undefined}/>
                <Box ml="3">
                    <Text color="text"
                          fontWeight="semibold">
                        {foundUser.displayName}
                    </Text>
                </Box>
            </Flex>
                <Divider/></>
            }
            {chats && Object.entries(chats)?.sort((a, b) => (b[1].date ? b[1].date.second : 0) - (a[1].date ? a[1].date.second : 0)).map(chat =>
                <Flex px={2}
                      py={1}
                      bg={selectedChat.chatUser.uid === chat[1].userInfo.uid ? selectedChatColor : undefined}
                      onClick={() => selectChat(chat[1].userInfo)}
                      key={chat[0]}
                      _hover={{backgroundColor: chatHoverColor}}
                      cursor="pointer">
                    <Avatar src={chat[1].userInfo.photoUrl ?? undefined}/>
                    <Box ml='3'>
                        <Text color="text"
                              overflow="hidden"
                              whiteSpace="nowrap"
                              width="200px"
                              textOverflow="ellipsis"
                              fontWeight="semibold">
                            {chat[1].userInfo.displayName}
                        </Text>
                        {chat[1].lastMessage && <Text
                            overflow="hidden"
                            whiteSpace="nowrap"
                            width="200px"
                            textOverflow="ellipsis"
                            fontSize="sm"
                            color={selectedChat.chatUser.uid === chat[1].userInfo.uid ? "text" : "#5A6670"}>{chat[1].lastMessage.msgText}</Text>}
                    </Box>
                </Flex>
            )}
        </Box>
    </Box>
};
