import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import {AtSignIcon, Icon} from "@chakra-ui/icons";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useUser} from "../hooks/useUser";
import {useNavigate} from "react-router-dom";

type SideBarDrawerProps = {
    isOpen:boolean
    onClose:()=>void
}

export const SideBarDrawer : React.FC<SideBarDrawerProps> = React.memo(({isOpen, onClose}

) => {
    const navigate = useNavigate()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const logOutHandler = () => {
        signOut(auth).then(() =>
            navigate("/login")
        )
    }
    const user = useUser()

    return  <Drawer size={isLargerThan800 ? "xs" : "full"}
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                   >
        <DrawerOverlay/>
        <DrawerContent bg="#17212B"
                       borderRightWidth="1px"
                       borderRightColor="#0A121B">
            <DrawerCloseButton color="#5A6670"/>
            <DrawerHeader display="flex"
                          alignItems="center">
                <Avatar mr={4}
                        src={user?.photoURL ?? undefined}/>
                <Box ml="3">
                    <Text color="#F5F5F5"
                          fontWeight='semibold'
                          fontSize='md'>
                        <AtSignIcon/>
                        {user?.displayName}
                    </Text>
                    <Button borderRadius={5}
                            variant="solid"
                            size="xs"
                            bg="#2b5278"
                            _hover={{backgroundColor: "#3971a8"}}
                            color="#F5F5F5"
                            onClick={logOutHandler}
                            leftIcon={<Icon fill="none" width="18px" height="18px" viewBox="0 0 14 14">
                                <path
                                    d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
                                    stroke="#F5F5F5"
                                />
                            </Icon>}
                    >Logout</Button>
                </Box>
            </DrawerHeader>
            <Divider borderColor="#0A121B"/>
            <DrawerBody>


            </DrawerBody>
            <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
    </Drawer>
})