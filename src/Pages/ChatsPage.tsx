import React, {useContext, useEffect, useState} from 'react';
import {useUser} from "../hooks/useUser";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Grid,
    GridItem,
    Input,
    InputLeftAddon,
    InputGroup,
    useMediaQuery,
    InputRightAddon,
    Avatar, Text, Button, Flex
} from "@chakra-ui/react";
import {SideBar} from "../Components/SideBar";
import {SelectedUserContext} from "../hooks/selectedUserContext";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../firebase";
import {v4} from "uuid";
import {arrayUnion, doc, Timestamp, updateDoc} from "firebase/firestore";
import {MessagesBlock} from "../Components/MessagesBlock";
import {ArrowForwardIcon, AttachmentIcon} from '@chakra-ui/icons';

export const ChatsPage = () => {
    const user = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate]);
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const {state} = useContext(SelectedUserContext)
    const [msgText, setMsgText] = useState("")
    const [img, setImg] = useState<File | null>(null)
    const sendMsg = async () => {
        if (img) {
            const storageRef = ref(storage, v4())
            const uploadImg = uploadBytesResumable(storageRef, img)
            uploadImg.on("state_changed", () => {
                getDownloadURL(uploadImg.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", state.chatId as string), {
                        messages: arrayUnion({
                            id: v4(),
                            msgText,
                            senderId: user!.uid,
                            date: Timestamp.now(),
                            img: downloadURL
                        })
                    })
                })
            })
        } else {
            await updateDoc(doc(db, "chats", state.chatId as string), {
                messages: arrayUnion({
                    id: v4(),
                    msgText,
                    senderId: user!.uid,
                    date: Timestamp.now()
                })
            })
        }
        await Promise.allSettled([await updateDoc(doc(db, "usersChats", user!.uid), {
            [state.chatId + ".lastMessage"]: {msgText},
            [state.chatId + ".date"]: Timestamp.now()
        }),
            await updateDoc(doc(db, "usersChats", state.chatUser.uid), {
                [state.chatId + ".lastMessage"]: {msgText},
                [state.chatId + ".date"]: Timestamp.now()
            })])
        setImg(null)
        setMsgText("")
    }

    return <Grid templateAreas={isLargerThan800
            ? `"navChat info"
                  "navChat chat"`
            : `"info info"
                  "chat chat"`}
              gridTemplateRows={'80px 1fr'}
              gridTemplateColumns={'290px 3fr'}
              h='100vh'
        >
            <GridItem bg="#17212B" area={'navChat'}>
                <SideBar/>
            </GridItem>
            <GridItem area={'info'}
                      bg="#17212B">
                {state.chatId && <Flex height="80px" alignItems={"center"}>
                    <Avatar mx={4} size='lg' src={state.chatUser.photoUrl ?? undefined}/>
                    <Text color="#F5F5F5"
                          fontWeight='semibold'>
                        {state.chatUser.displayName}
                    </Text>
                </Flex>}
            </GridItem>
            <GridItem overscrollBehaviorY={"none"}
                      style={{scrollbarWidth: "thin"}}
                      overflowY="auto"
                      area={'chat'}
                      bg="#0E1621">
                {state.chatId && <Box color="#F5F5F5">
                    <MessagesBlock/>
                    <Box p={1}
                         bg="#17212B">

                        <input type="file"
                               style={{display: "none"}}
                               id="file"
                               onChange={event => {
                                   if (event.currentTarget.files) {
                                       setImg(event.currentTarget.files[0])
                                   }
                               }}/>
                        <InputGroup size={"lg"}
                                    border={"none"}>
                            <InputLeftAddon _hover={{color: "#F5F5F5"}}
                                            border={"none"}
                                            bg={"none"}
                                            cursor={"pointer"}
                                            color="#5A6670"
                                            children={<label htmlFor="file"><AttachmentIcon boxSize={7}/></label>}/>
                            <Input
                                borderStyle={"none"}
                                color="#F5F5F5"
                                focusBorderColor="#17212B"
                                _hover={{borderColor: "none"}}
                                placeholder="Write down a message..."
                                value={msgText}
                                onChange={event => setMsgText(event.currentTarget.value)}
                                onKeyDown={event => event.code === "Enter" && sendMsg()}/>
                            <InputRightAddon onClick={sendMsg}
                                             _hover={{color: "#F5F5F5"}}
                                             border={"none"}
                                             bg={"none"}
                                             cursor={"pointer"}
                                             color="#5A6670"
                                             children={<ArrowForwardIcon boxSize={7}/>}/>
                        </InputGroup>

                    </Box>

                </Box>}
            </GridItem>
        </Grid>

};