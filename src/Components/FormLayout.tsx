import React from 'react';
import {Flex, Stack} from "@chakra-ui/react";

type FormLayoutProps = {
    children:React.ReactNode
}
export const FormLayout: React.FC<FormLayoutProps> = React.memo(({children}) => {
    return <Flex flexDirection="column"
                 width="100wh"
                 height="100vh"
                 backgroundColor="#0E1621"
                 justifyContent="center"
                 alignItems="center">
        <Stack  flexDir="column"
               mb="2"
               justifyContent="center"
               alignItems="center">
            <Stack borderRadius="xl"
                   spacing={4}
                   p="1rem"
                   bg="#17212B"
                   boxShadow="md"
                   alignItems="center"
                   borderWidth="1px"
                   borderColor="#0A121B"
            >
            {children}
            </Stack>
        </Stack>
    </Flex>
}
)
