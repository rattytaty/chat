import React, {useContext} from 'react';
import {Avatar, Flex, Text, useColorModeValue, useMediaQuery} from "@chakra-ui/react";
import {selectedUser, SelectedUserContext} from "../hooks/providers/SelectedUserContext";
import {ArrowBackIcon} from "@chakra-ui/icons";

export const ChatInfo: React.FC = React.memo(() => {
    const {selectedChat, dispatch} = useContext(SelectedUserContext)
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')

    return <>
        {selectedChat.chatId && <Flex bg="secondaryBg"
                                      borderBottomWidth="1px"
                                      borderBottomColor="borders"
                                      height="60px"
                                      alignItems="center">
            <ArrowBackIcon boxSize={7}
                           cursor="pointer"
                           color="icons"
                           _hover={{color: iconHoverColor}}
                           onClick={() => {
                               dispatch({type: "BACK_HOME", payload: {} as selectedUser})
                           }}
                           mx={4}
                           style={isLargerThan600 ? {display: "none"} : undefined}
            />
            <Avatar mr={4}
                    ml={isLargerThan600 ? 4 : 0}
                    src={selectedChat.chatUser.photoUrl ?? undefined}/>
            <Text color="text"
                  fontWeight="semibold">
                {selectedChat.chatUser.displayName}
            </Text>
        </Flex>}
    </>
})