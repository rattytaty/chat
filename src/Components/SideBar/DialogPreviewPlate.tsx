import React from 'react';
import {Avatar, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {previewInfo} from "./SideBar";
import {user} from "../../lib/hooks/useUserStore";
import {useDialogStore} from "../../lib/hooks/useDialogStore";
import {CheckIcon, SmallCloseIcon} from "@chakra-ui/icons";
import {returnFormatedTime} from "../../lib/helpers/returnFormatedTime";

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
            <Box display="flex">
                <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    width="190px"
                    textOverflow="ellipsis"
                    fontWeight="semibold">
                    {dialogUser.username}
                </Text>
                {previewInfo&&<Text fontSize="sm"
                       color="secondaryText">{returnFormatedTime(previewInfo.lastMessage.sendingTime)}
                </Text>}

            </Box>
            <Box display="flex"
                 justifyContent="space-between">
                {previewInfo?.lastMessage && <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    width="190px"
                    textOverflow="ellipsis"
                    fontSize="sm"
                    color={receiverUser?.id === dialogUser.id ? "text" : "#5A6670"}>{previewInfo.lastMessage.text}</Text>}
                {previewInfo?.isRead
                    ? <CheckIcon color="icons"/>
                    : <SmallCloseIcon color="icons" boxSize={5}/>}
            </Box>


        </Box>
    </Flex>
};
