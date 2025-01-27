import React, {useContext} from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Text,
    useColorModeValue,
    useMediaQuery
} from "@chakra-ui/react";
import {AtSignIcon, Icon, SettingsIcon} from "@chakra-ui/icons";
import {auth} from "../../../lib/configs/firebase";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../../lib/hooks/useUserStore";

type SideBarDrawerProps = {
    isOpen: boolean
    onClose: () => void
}

export const ContentOfDrawer: React.FC<SideBarDrawerProps> = React.memo(({isOpen, onClose}
) => {
    const navigate = useNavigate()
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const logOutHandler = () => {
        auth.signOut()
    }

    const {user} = useUserStore()

    const navigationHoverColor = useColorModeValue('#adc2ee', '#202B36')

    return <Drawer size={isLargerThan600 ? "xs" : "full"}
                   isOpen={isOpen}
                   placement="left"
                   onClose={onClose}>


        <DrawerOverlay/>
        <DrawerContent bg="secondaryBg"
                       borderRightWidth="1px"
                       borderRightColor="borders">
            <DrawerCloseButton color="#5A6670"/>
            <DrawerHeader display="flex"
                          alignItems="center">
                <Avatar mr={4}
                        src={user?.avatar ?? undefined}/>
                <Box ml="3">
                    <Text color="text"
                          overflow="hidden"
                          whiteSpace="nowrap"
                          width="170px"
                          textOverflow="ellipsis"
                          fontWeight="semibold"
                          fontSize="md">
                        <AtSignIcon/>
                        {user?.username}
                    </Text>
                    <Button borderRadius={5}
                            variant="solid"
                            size="xs"
                            bg="#2b5278"
                            _hover={{backgroundColor: "#3971a8"}}
                            color="#F5F5F5"
                            onClick={logOutHandler}
                            leftIcon={<Icon fill="none"
                                            width="18px"
                                            height="18px"
                                            viewBox="0 0 14 14">
                                <path d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
                                      stroke="#F5F5F5"/>
                            </Icon>}
                    >Logout</Button>
                </Box>
            </DrawerHeader>
            <Divider borderColor="borders"/>
            <DrawerBody>
                <Flex mx={-6}
                      px={8}
                      py={3}
                      alignItems="center"
                      gap={2}
                      cursor="pointer"
                      color="text"
                      onClick={() => navigate("/settings")
                      }
                      _hover={{backgroundColor: navigationHoverColor}}>
                    <SettingsIcon mr={2}
                                  boxSize={5}/>
                    <Text>Settings</Text>
                </Flex>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
})