import React from 'react';
import {HamburgerIcon} from "@chakra-ui/icons";
import {useColorModeValue} from "@chakra-ui/react";

const DrawerToggleButton = ({onOpen}:{onOpen:() => void}) => {
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')

    return <HamburgerIcon boxSize={7}
                          cursor="pointer"
                          color="icons"
                          _hover={{color: iconHoverColor}}
                          onClick={onOpen}
    />
};

export default DrawerToggleButton;