import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {message} from "./ChatMainBlock";
import {formatTimeToHHMM} from "../../lib/helpers/formatTimeToHHMM";
import {formatToDDMM} from "../../lib/helpers/formatToDDMM";

type MessageProps = {
    position: "left" | "right",
    message: message
}

export const Message: React.FC<MessageProps> = React.memo(({position, message}) => {
    const todayDate = new Date()
    const dateOfMessage = new Date(message.sendingTime.seconds * 1000);
    const isToday = todayDate.getDate() === dateOfMessage.getDate() && todayDate.getMonth() === dateOfMessage.getMonth() && todayDate.getFullYear() === dateOfMessage.getFullYear()
    const messageTime = isToday
        ? formatTimeToHHMM(dateOfMessage)
        : formatToDDMM(dateOfMessage)

    return <Flex flexDirection={position === "left" ? "row" : "row-reverse"}
                 m={1}
                 alignItems="end"
                 justifyContent={position}>
        <Text color="#5A6670"
              m={2}>{messageTime}</Text>
        <Text p={2}
              color="text"
              maxWidth="75%"
              borderRadius="xl"
              bg={position === "left" ? "leftMsg" : "rightMsg"}>
            {message.text}</Text>
    </Flex>
})
