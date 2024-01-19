import React, {useContext} from 'react';
import {Avatar, Flex, Text, useColorModeValue, useMediaQuery} from "@chakra-ui/react";
import {SelectedUserContext} from "../hooks/selectedUserContext";
import {ArrowBackIcon} from "@chakra-ui/icons";

export const ChatInfo: React.FC = React.memo(() => {
    const {state} = useContext(SelectedUserContext)
    const {dispatch} = useContext(SelectedUserContext)
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')

    return <>
        {state.chatId && <Flex bg="secondaryBg"
                               borderBottomWidth="1px"
                               borderBottomColor="borders"
                               height="60px"
                               alignItems="center">
            <ArrowBackIcon boxSize={7}
                           cursor="pointer"
                           color="icons"
                           _hover={{color: iconHoverColor}}
                           onClick={() => {
                               dispatch({type: "BACK_HOME", payload: {} as{
                                       uid: string
                                       photoUrl: string | null
                                       displayName: string
                                   }})
                           }}
                           mx={4}
                           style={isLargerThan600 ? {display: "none"} : undefined}
            />
            <Avatar mr={4}
                    size="sm"
                    ml={isLargerThan600 ? 4 : 0}
                    src={state.chatUser.photoUrl ?? undefined}/>
            <Text color="text"
                  fontWeight="semibold">
                {state.chatUser.displayName}
            </Text>
        </Flex>}
    </>
})