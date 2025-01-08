import React, {useContext, useState} from 'react';
import {SelectedUserContext} from "../hooks/providers/SelectedUserContext";
import {Box, Input, InputGroup, InputLeftAddon, InputRightAddon, useColorModeValue} from "@chakra-ui/react";
import {MessagesBlock} from "./MessagesBlock";
import {ArrowForwardIcon, AttachmentIcon} from "@chakra-ui/icons";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../firebase";
import {v4} from "uuid";
import {arrayUnion, doc, Timestamp, updateDoc} from "firebase/firestore";
import {UserContext} from "../hooks/providers/UserContext";
import {ChatInfo} from "./ChatInfo";

export const Chat: React.FC = React.memo(() => {
    const {selectedChat} = useContext(SelectedUserContext)
    const user = useContext(UserContext)
    const [msgText, setMsgText] = useState("")
    const [img, setImg] = useState<File | null>(null)
    const sendMsg = async () => {
        if (img) {
            const storageRef = ref(storage, v4())
            const uploadImg = uploadBytesResumable(storageRef, img)
            uploadImg.on("state_changed", () => {
                getDownloadURL(uploadImg.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", selectedChat.chatId as string), {
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
            await updateDoc(doc(db, "chats", selectedChat.chatId as string), {
                messages: arrayUnion({
                    id: v4(),
                    msgText,
                    senderId: user!.uid,
                    date: Timestamp.now()
                })
            })
        }
        await Promise.allSettled([await updateDoc(doc(db, "usersChats", user!.uid), {
            [selectedChat.chatId + ".lastMessage"]: {msgText},
            [selectedChat.chatId + ".date"]: Timestamp.now()
        }),
            await updateDoc(doc(db, "usersChats", selectedChat.chatUser.uid), {
                [selectedChat.chatId + ".lastMessage"]: {msgText},
                [selectedChat.chatId + ".date"]: Timestamp.now()
            })])
        setImg(null)
        setMsgText("")
    }
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')

    return <Box bg="primaryBg"
                h="100vh">
        {selectedChat.chatId && <Box >
            <ChatInfo/>
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
                           value={msgText}
                           onChange={event => setMsgText(event.currentTarget.value)}
                           onKeyDown={event => event.code === "Enter" && sendMsg()}/>
                    <InputRightAddon onClick={sendMsg}
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
