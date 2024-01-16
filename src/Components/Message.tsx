import React from 'react';
import {message} from './MessagesBlock';
import {Flex, Text} from "@chakra-ui/react";


const formatTimeToHHMM = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
const formatToMMDD = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}.${day}`;
}
type Message = {
    position: "left" | "right",
    message: message
}

export const Message: React.FC<Message> = React.memo(({position, message}) => {
    const todayDate = new Date()
    const dateOfMessage = new Date(message.date.seconds * 1000);
    const isToday = todayDate.getDate() === dateOfMessage.getDate() && todayDate.getMonth() === dateOfMessage.getMonth() && todayDate.getFullYear() === dateOfMessage.getFullYear()
    const messageTime = isToday
        ? formatTimeToHHMM(dateOfMessage)
        : formatToMMDD(dateOfMessage)

    return <Flex flexDirection={position === "left" ? "row" : "row-reverse"}
                 m={1}
                 alignItems="end"
                 justifyContent={position}>
        <Text color="#5A6670"
              m={2}>{messageTime}</Text>
        <Text p={2}
              color="text"
              maxWidth="75%"
              borderRadius='xl'
              bg={position === "left" ? "#182533" : "#2B5278"}>
            {message.msgText}</Text>
    </Flex>
})
