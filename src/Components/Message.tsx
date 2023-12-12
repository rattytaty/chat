import React from 'react';
import {message} from './MessagesBlock';
import {Box, Flex, Text} from "@chakra-ui/react";


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

export const Message = (props: {
    type: "left" | "right",
    message: message
}) => {

    const todayDate = new Date()
    const dateOfMessage = new Date(props.message.date.seconds * 1000);

    return <div>
        <Box>{
            props.type === "left"
                ? <Flex m={1} alignItems={"center"}>
                    <Text color="#5A6670"
                          m={2}>{todayDate.getDate() === dateOfMessage.getDate() && todayDate.getMonth() === dateOfMessage.getMonth()
                        ? formatTimeToHHMM(dateOfMessage)
                        : formatToMMDD(dateOfMessage)}
                    </Text>
                    <Text p={2}
                          maxWidth="75%"
                          borderRadius='xl'
                          bg="#182533">{props.message.msgText}</Text>
                </Flex>
                : <Flex
                    m={1}
                    alignItems={"center"}
                        justifyContent="right">
                    <Text p={2}
                          borderRadius='xl'
                          maxWidth="75%"
                          bg="#2B5278">{props.message.msgText}</Text>
                    <Text color="#5A6670"
                          m={2} >{todayDate.getDate() === dateOfMessage.getDate() && todayDate.getMonth() === dateOfMessage.getMonth()
                        ? formatTimeToHHMM(dateOfMessage)
                        : formatToMMDD(dateOfMessage)}
                    </Text>
                </Flex>
        }</Box>
    </div>
};
