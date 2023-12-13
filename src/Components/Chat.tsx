import React, {useContext, useState} from 'react';
import {SelectedUserContext} from "../hooks/selectedUserContext";
import {Box, Input, InputGroup, InputLeftAddon, InputRightAddon} from "@chakra-ui/react";
import {MessagesBlock} from "./MessagesBlock";
import {ArrowForwardIcon, AttachmentIcon} from "@chakra-ui/icons";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../firebase";
import {v4} from "uuid";
import {arrayUnion, doc, Timestamp, updateDoc} from "firebase/firestore";
import {useUser} from "../hooks/useUser";

export const Chat: React.FC = React.memo(() => {
    const {state} = useContext(SelectedUserContext)
    const user = useUser()
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
    return  <Box >
        {state.chatId && <Box >
            <MessagesBlock/>
            <Box  p={1}
                  bg="#17212B">
                <input type="file"
                       style={{display: "none"}}
                       id="file"
                       onChange={event => {
                           if (event.currentTarget.files) {
                               setImg(event.currentTarget.files[0])
                           }
                       }}/>
                <InputGroup
                    size={"lg"}
                    border={"none"}>
                    <InputLeftAddon _hover={{color: "#F5F5F5"}}
                                    border={"none"}
                                    bg={"none"}
                                    cursor={"pointer"}
                                    color="#5A6670"
                                    children={<label htmlFor="file"><AttachmentIcon boxSize={7}/></label>}/>
                    <Input borderStyle={"none"}
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


        </Box>
})
