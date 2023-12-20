import React, {useContext} from 'react';
import {Avatar, Flex, Text} from "@chakra-ui/react";
import {SelectedUserContext} from "../hooks/selectedUserContext";

export const ChatInfo: React.FC = React.memo(() => {
    const {state} = useContext(SelectedUserContext)
    return <>
        {state.chatId && <Flex bg="#17212B"
                               height="70px"
                               alignItems={"center"}>
            <Avatar mx={4}
                    src={state.chatUser.photoUrl ?? undefined}/>
            <Text color="#F5F5F5"
                  fontWeight='semibold'>
                {state.chatUser.displayName}
            </Text>
        </Flex>}
    </>
})