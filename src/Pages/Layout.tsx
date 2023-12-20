import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
import {SideBar} from "../Components/SideBar";
import {useUser} from "../hooks/useUser";

export const Layout = () => {

    const user = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate]);

    return <Grid h="100vh"
                 w="100vw"
                 templateAreas={`"navBar chat"`}>
        <GridItem area="navBar">
            <SideBar/>
        </GridItem>
        <GridItem overflow="hidden"
                  area="chat"
                  bg="#0E1621">
            <Outlet/>
        </GridItem>
    </Grid>
};