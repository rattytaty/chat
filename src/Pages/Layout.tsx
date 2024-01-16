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
                 templateAreas={`"navBar chat"`}
                 gridTemplateColumns={isLargerThan800?"350px 1fr":(state.chatId?"0px 1fr":"1fr 0px")}>
        <GridItem area="navBar">
            <SideBar/>
        </GridItem>
        <GridItem overflow="hidden"
                  area="chat"
                  bg="primaryBg">
            <Outlet/>
        </GridItem>
    </Grid>
};