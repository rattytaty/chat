import React from 'react';
import {Avatar, Flex, Text, useColorModeValue, useMediaQuery} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {useDialogStore} from "../../lib/hooks/useDialogStore";

export const DialogInfo: React.FC = React.memo(() => {

    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')
    const {receiverUser, changeDialog} = useDialogStore()
    const closeDialog = ()=>{
        changeDialog(null,null )
    }
    return <>
        {receiverUser && <Flex bg="secondaryBg"
                               borderBottomWidth="1px"
                               borderBottomColor="borders"
                               height="60px"
                               alignItems="center">
            <ArrowBackIcon boxSize={7}
                           cursor="pointer"
                           color="icons"
                           _hover={{color: iconHoverColor}}
                           onClick={closeDialog}
                           mx={4}
                           style={isLargerThan600 ? {display: "none"} : undefined}
            />
            <Avatar mr={4}
                    ml={isLargerThan600 ? 4 : 0}
                    src={receiverUser.avatar ?? undefined}/>
            <Text color="text"
                  fontWeight="semibold">
                {receiverUser.username}
            </Text>
        </Flex>}
    </>
})