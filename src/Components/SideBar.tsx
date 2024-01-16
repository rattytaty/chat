import React, {KeyboardEvent, useContext, useEffect, useState} from 'react';
import {useUser} from "../hooks/useUser";
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
import {SelectedUserContext} from "../hooks/selectedUserContext";
import {
    Avatar,
    Box,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
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
        userInfo: {
            uid: string
            photoUrl: string | null
            displayName: string
        }
        lastMessage: { msgText: string }
    }
}

export const SideBar = () => {

    const {dispatch, state} = useContext(SelectedUserContext)

    const user = useUser()


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
    const selectFoundUser = async (userInfo: {
        uid: string
        photoUrl: string | null
        displayName: string
    }) => {
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

    return <Stack borderRightWidth="1px"
                  borderRightColor="#0A121B"
                  bg="secondaryBg"
                  h="100vh">
        <Flex px={3}
              py={2}
              alignItems="center"
              gap={4}
              justifyContent="space-between">
            <HamburgerIcon boxSize={7}
                           cursor="pointer"
                           color="#5A6670"
                           _hover={{color: "#F5F5F5"}}
                           onClick={onOpen}
            />
            <InputGroup  size="sm">
                <Input borderRadius="3xl"
                       bg="#242F3D"
                       border="none"
                       _focusVisible={{
                           outline: "none",
                       }}
                       textColor="text"
                       placeholder="Search User"
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
        <Stack style={{scrollbarWidth: "thin"}}
               overflowY="auto"
               overflowX="hidden">
            {foundUser && <Flex p={2}
                                onClick={() => selectFoundUser(foundUser)}
                                _hover={{backgroundColor: "#202B36"}}
                                cursor="ponter">
                <Avatar src={foundUser.photoUrl ?? undefined}/>
                <Box ml="3">
                    <Text color="#F5F5F5"
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
                      bg={state.chatUser.uid === chat[1].userInfo.uid ? "#2b5278" : undefined}
                      onClick={() => selectChat(chat[1].userInfo)}
                      key={chat[0]}
                      _hover={{backgroundColor: "#202B36"}}
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
                            color={state.chatUser.uid === chat[1].userInfo.uid ? "text" : "#5A6670"}>{chat[1].lastMessage.msgText}</Text>}
                    </Box>
                </Flex>
            )}
        </Stack>
    </Stack>
};
