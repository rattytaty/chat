import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Grid, GridItem, useMediaQuery} from "@chakra-ui/react";
import {SideBar} from "../Components/SideBar";
import {useUser} from "../hooks/useUser";
import {SelectedUserContext} from "../hooks/selectedUserContext";

export const Layout = () => {

    const user = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const {state} = useContext(SelectedUserContext)

    return <Grid h="100vh"
                 w="100vw"
                 templateAreas={state.chatId ? `"navBar chat"` : (isLargerThan800 ? `"navBar chat"` : `"navBar"`)}>
        <GridItem w={state.chatId ? "" : (isLargerThan800 ? "" : "100vw")} area="navBar">
            <SideBar/>
        </GridItem>
        <GridItem overflow="hidden"
                  area="chat"
                  bg="#0E1621">
            <Outlet/>
        </GridItem>
    </Grid>
};