import React, {useContext} from 'react';
import {Avatar, Flex, Text, useMediaQuery} from "@chakra-ui/react";
import {SelectedUserContext} from "../hooks/selectedUserContext";
import {ArrowBackIcon} from "@chakra-ui/icons";

export const ChatInfo: React.FC = React.memo(() => {
    const {state} = useContext(SelectedUserContext)
    const {dispatch} = useContext(SelectedUserContext)
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    return <>
        {state.chatId && <Flex bg="#17212B"
                               height="70px"
                               alignItems={"center"}>

            <ArrowBackIcon boxSize={7}
                           cursor="pointer"
                           color="#5A6670"
                           _hover={{color: "#F5F5F5"}}
                           onClick={() => {
                               dispatch({type: "BACK_HOME", payload: {} as{
                                       uid: string
                                       photoUrl: string | null
                                       displayName: string
                                   }})
                           }}
                           mx={4}
                           style={isLargerThan800 ? {display: "none"} : undefined}
            />
            <Avatar mr={4}
                    ml={isLargerThan800 ? 4 : 0}
                    src={state.chatUser.photoUrl ?? undefined}/>
            <Text color="#F5F5F5"
                  fontWeight='semibold'>
                {state.chatUser.displayName}
            </Text>
        </Flex>}
    </>
})