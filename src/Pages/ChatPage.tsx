import React, {useEffect} from 'react';
import {useUser} from "../hooks/useUser";
import {useNavigate} from "react-router-dom";
import {Grid, GridItem, useMediaQuery} from "@chakra-ui/react";
import {SideBar} from "../Components/SideBar";
import {ChatInfo} from "../Components/ChatInfo";
import {Chat} from "../Components/Chat";

export const ChatPage = () => {
    const user = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate]);
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')


    return <Grid templateAreas={isLargerThan800
        ? `"navChat info"
                  "navChat chat"`
        : `"info info"
                  "chat chat"`}
                 gridTemplateRows={'80px 1fr'}
                 gridTemplateColumns={'290px 3fr'}
                 h='100vh'>
        <GridItem bg="#17212B"
                  area={'navChat'}>
            <SideBar/>
        </GridItem>
        <GridItem area={'info'}
                  bg="#17212B">
            <ChatInfo/>
        </GridItem>
        <GridItem
            overscrollBehaviorY={"none"}
            style={{scrollbarWidth: "thin"}}
            overflowY="auto"
            area={'chat'}
                  bg="#0E1621">
            <Chat/>
        </GridItem>
    </Grid>

};