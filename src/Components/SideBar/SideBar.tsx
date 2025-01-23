import React, {useEffect, useState} from 'react';

import {Avatar, Box, Divider, Flex, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {SidebarDrawer} from "./Drawer/Drawer";
import {InputForUserSearch} from "./InputForUserSearch";
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from "../../lib/firebase";
import {useUserStore} from "../../hooks/useUserStore";


export type foundUser = {
    displayName: string
    email: string
    uid: string
    photoUrl: string
}
export type selectedUser = {
    uid: string
    photoUrl: string | null
    displayName: string
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


type state = {
    chatId: string | null
    chatUser: selectedUser
}

export const SideBar = () => {
    const selectedChat: state = {
        chatId: null,
        chatUser: {} as selectedUser
    }


    const [foundUser, setFoundUser] = useState<foundUser | null>(null)


    const {isOpen, onOpen, onClose} = useDisclosure()

    const selectedChatColor = useColorModeValue('#adc2ee', '#202B36')

    const chatHoverColor = useColorModeValue('#7eb2e0', '#24394e')
    const {user} = useUserStore()
    console.log(user)

/*    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", user!.id), (doc) => {
        setChats(doc.data)
        })
        return () => unsub()
    }, [user]);*/
    const [chats, setChats] = useState<chat>()

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
            <SidebarDrawer isOpen={isOpen}
                           onClose={onClose}
                           onOpen={onOpen}/>
            <InputForUserSearch setFoundUser={setFoundUser}/>
        </Flex>
        <Box style={{scrollbarWidth: "thin"}}
             overflowY="auto"
             overflowX="hidden">
            {foundUser && <><Flex p={2}
                                  onClick={() => {
                                  }}
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
                      onClick={() => {
                      }}
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
