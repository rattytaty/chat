import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Grid, GridItem, useMediaQuery} from "@chakra-ui/react";
import {SideBar} from "../Components/SideBar";
import {UserContext} from "../hooks/providers/UserContext";
import {SelectedUserContext} from "../hooks/providers/SelectedUserContext";

export const Layout = () => {

    const user = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const [isLargerThan600] = useMediaQuery("(min-width: 600px)")
    const {selectedChat} = useContext(SelectedUserContext)

    return <Grid h="100vh"
                 w="100vw"
                 templateAreas={`"navBar chat"`}
                 gridTemplateColumns={isLargerThan600 ? "300px 1fr" : (selectedChat.chatId ? "0px 1fr" : "1fr 0px")}>
        <GridItem area="navBar">
            <SideBar/>
        </GridItem>
        <GridItem area="chat"
                  bg="secondaryBg">
            <Outlet/>
        </GridItem>
    </Grid>
};