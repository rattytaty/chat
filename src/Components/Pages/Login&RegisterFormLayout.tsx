import React from 'react';
import {Flex, Stack} from "@chakra-ui/react";

type FormLayoutProps = {
    children: React.ReactNode
}
export const LoginRegisterFormLayout: React.FC<FormLayoutProps> = React.memo(({children}) => {

        return <Flex flexDirection="column"
                     width="100wh"
                     height="100vh"
                     bg="primaryBg"
                     justifyContent="center"
                     alignItems="center">
            <Stack flexDir="column"
                   mb="2"
                   justifyContent="center"
                   alignItems="center">
                <Stack borderRadius="xl"
                       spacing={4}
                       p="1rem"
                       bg="secondaryBg"
                       boxShadow="md"
                       alignItems="center"
                       borderWidth="1px"
                       borderColor="borders">
                    {children}
                </Stack>
            </Stack>
        </Flex>
    }
)
