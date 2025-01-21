import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Grid, GridItem, useMediaQuery} from "@chakra-ui/react";
import {SideBar} from "../Components/SideBar";
import {UserContext} from "../hooks/providers/UserContext";
import {SelectedUserContext} from "../hooks/providers/SelectedUserContext";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../lib/firebase";
import {useUserStore} from "../hooks/providers/useUserStore";

export const Layout = () => {

    const {user, isLoading, fetchUserInfo} = useUserStore()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            }
        )
        return ()=>{
            unsub()
        }
    }, []);

    //const user = useContext(UserContext)
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