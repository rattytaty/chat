import React from 'react';
import {Outlet} from "react-router-dom";
import {Grid, GridItem, useMediaQuery} from "@chakra-ui/react";
import {SideBar} from "../SideBar/SideBar";

import {useUserObserver} from "../../hooks/useUserObserver";

export const Layout = () => {

    useUserObserver()
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)")
    const selectedChat = {chatId:"12313"}

    return <Grid h="100vh"
                 w="100vw"
                 templateAreas={`"navBar chat"`}
                 gridTemplateColumns={isLargerThan600 ? "300px 1fr" : (selectedChat.chatId ? "0px 1fr" : "1fr 0px")}>
        <GridItem area="navBar"
                  hidden={selectedChat.chatId ? (!isLargerThan600) : false}>
            <SideBar/>
        </GridItem>
        <GridItem area="chat"
                  overflow="hidden"
                  bg="secondaryBg">
            <Outlet/>
        </GridItem>
    </Grid>
};