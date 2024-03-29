import React, {KeyboardEvent, useContext, useEffect, useState} from 'react';
import {UserContext} from "../hooks/providers/UserContext";
import {db} from "../firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import {selectedUser, SelectedUserContext} from "../hooks/providers/SelectedUserContext";
import {
    Avatar,
    Box,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {HamburgerIcon, Search2Icon} from '@chakra-ui/icons';
import {SideBarDrawer} from "./SideBarDrawer";

type foundUser = {
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
    const [userForSearch, setUserForSearch] = useState("");
    const [foundUser, setFoundUser] = useState<foundUser | null>(null)
    const searchForUser = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userForSearch))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc =>
                setFoundUser(doc.data() as foundUser)
            )
        } catch (error) {
            console.log(error)
        }
    }
    const handleUserSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && searchForUser()
    }
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
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')
    const selectedChatColor = useColorModeValue('#7eb2e0', '#2b5278')

    const chatHoverColor = useColorModeValue('#adc2ee', '#202B36')


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
            <HamburgerIcon boxSize={7}
                           cursor="pointer"
                           color="icons"
                           _hover={{color: iconHoverColor}}
                           onClick={onOpen}
            />
            <InputGroup size="sm">
                <Input borderRadius="3xl"
                       bg="inputBg"
                       border="none"
                       _focusVisible={{
                           outline: "none",
                       }}
                       _placeholder={{color: "#F5F5F5"}}
                       textColor="text"
                       placeholder="Search for a user"
                       value={userForSearch}
                       onChange={e => setUserForSearch(e.currentTarget.value)}
                       onKeyDown={handleUserSearch}
                />
                <InputLeftElement pointerEvents="none">
                    <Search2Icon color="#5A6670"/>
                </InputLeftElement>
            </InputGroup>
        </Flex>
        <SideBarDrawer isOpen={isOpen}
                       onClose={onClose}/>
        <Box style={{scrollbarWidth: "thin"}}
             overflowY="auto"
             overflowX="hidden">
            {foundUser && <Flex p={2}
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
            }
            {foundUser && <Divider/>}
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
