import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {message} from "./ChatMainBlock";

import {returnFormatedTime} from "../../lib/helpers/returnFormatedTime";

type MessageProps = {
    position: "left" | "right",
    message: message
}

export const Message: React.FC<MessageProps> = React.memo(({position, message}) => {

    return <Flex flexDirection={position === "left" ? "row" : "row-reverse"}
                 m={1}
                 alignItems="end"
                 justifyContent={position}>
        <Text color="#5A6670"
              m={2}>{returnFormatedTime(message.sendingTime)}</Text>
        <Text p={2}
              color="text"
              maxWidth="75%"
              borderRadius="xl"
              bg={position === "left" ? "leftMsg" : "rightMsg"}>
            {message.text}</Text>
    </Flex>
})