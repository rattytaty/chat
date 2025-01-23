import React, {useState} from 'react';
import {Box, Input, InputGroup, InputLeftAddon, InputRightAddon, useColorModeValue} from "@chakra-ui/react";
import {MessagesBlock} from "./MessagesBlock";
import {ArrowForwardIcon, AttachmentIcon} from "@chakra-ui/icons";

import {SelectedChatInfo} from "./SelectedChatInfo";

export const ChatMainBlock: React.FC = React.memo(() => {


    const [msgText, setMsgText] = useState("")
    const [img, setImg] = useState<File | null>(null)

    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')

    return <Box bg="primaryBg"
                h="100vh">
        {/*{selectedChat.chatId && <Box >
            <SelectedChatInfo/>
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
                           //onKeyDown={event => event.code === "Enter" && sendMsg()}\
                    />
                    <InputRightAddon //onClick={sendMsg}
                                     _hover={{color: iconHoverColor}}
                                     border="none"
                                     bg="none"
                                     cursor="pointer"
                                     color="icons"
                                     children={<ArrowForwardIcon boxSize={6}/>}/>
                </InputGroup>
            </Box>
        </Box>}*/}
    </Box>
})
