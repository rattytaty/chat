import React from 'react';
import {Avatar, Text, Box, Flex, useColorModeValue} from "@chakra-ui/react";

type DialogPreviewPlateProps = {
    chatId:string
    avatar: string
    lastMessage: string
}

export const DialogPreviewPlate = ({avatar, lastMessage}: DialogPreviewPlateProps) => {

    const selectedChatColor = useColorModeValue('#adc2ee', '#202B36')

    const chatHoverColor = useColorModeValue('#7eb2e0', '#24394e')

    return /*<Flex px={2}
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
            {lastMessage && <Text
                overflow="hidden"
                whiteSpace="nowrap"
                width="200px"
                textOverflow="ellipsis"
                fontSize="sm"
                color={selectedChat.chatUser.uid === dialog[1].userInfo.uid ? "text" : "#5A6670"}>{lastMessage}</Text>}
        </Box>
    </Flex>*/
};
