import React from 'react';
import {Avatar, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {previewInfo} from "./SideBar";
import {user} from "../../lib/hooks/useUserStore";
import {useDialogStore} from "../../lib/hooks/useDialogStore";

type DialogPreviewPlateProps = {
    previewInfo?: previewInfo
    dialogUser: user
    onPreviewClick: () => void
}

export const DialogPreviewPlate = ({previewInfo, dialogUser, onPreviewClick}: DialogPreviewPlateProps) => {

    const selectedChatColor = useColorModeValue('#adc2ee', '#202B36')
    const chatHoverColor = useColorModeValue('#7eb2e0', '#24394e')
    const {receiverUser} = useDialogStore()

    return <Flex px={2}
                 py={1}
                 bg={receiverUser?.id === dialogUser.id ? selectedChatColor : undefined}
                 onClick={onPreviewClick}
                 key={dialogUser.id}
                 _hover={{backgroundColor: chatHoverColor}}
                 cursor="pointer">
        <Avatar src={dialogUser.avatar ?? undefined}/>
        <Box ml='3'>
            <Text fontSize="sm" color="text"
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
                color={receiverUser?.id === dialogUser.id ? "text" : "#5A6670"}>{previewInfo.lastMessage}</Text>}
        </Box>
    </Flex>
};
