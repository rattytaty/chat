import React from 'react';
import {Avatar, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {previewInfo} from "./SideBar";
import {user} from "../../lib/hooks/useUserStore";

type DialogPreviewPlateProps = {
    previewInfo?: previewInfo
    dialogUser: user
    onPreviewClick:()=>void
}

export const DialogPreviewPlate = ({previewInfo, dialogUser, onPreviewClick}:DialogPreviewPlateProps) => {

    const selectedChatColor = useColorModeValue('#adc2ee', '#202B36')
    const chatHoverColor = useColorModeValue('#7eb2e0', '#24394e')



    const selectedChat = {chatUser:{uid:"12"}}

    return <Flex px={2}
                 py={1}
                 bg={selectedChat.chatUser.uid === dialogUser.id ? selectedChatColor : undefined}
                 onClick={onPreviewClick}
                 key={dialogUser.id}
                 _hover={{backgroundColor: chatHoverColor}}
                 cursor="pointer">
        <Avatar src={dialogUser.avatar ?? undefined}/>
        <Box ml='3'>
            <Text color="text"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  width="200px"
                  textOverflow="ellipsis"
                  fontWeight="semibold">
                {dialogUser.username}
            </Text>
            {previewInfo?.lastMessage && <Text
                overflow="hidden"
                whiteSpace="nowrap"
                width="200px"
                textOverflow="ellipsis"
                fontSize="sm"
                color={selectedChat.chatUser.uid === dialogUser.id ? "text" : "#5A6670"}>{previewInfo.lastMessage}</Text>}
        </Box>
    </Flex>
};
