import React from 'react';

import DrawerToggleButton from "./DrawerToggleButton";
import {ContentOfDrawer} from "./DrawerContent";

type SidebarDrawerProps = {
    onOpen: () => void
    isOpen: boolean
    onClose: () => void
}

export const SidebarDrawer = ({onOpen, isOpen, onClose}:SidebarDrawerProps ) => {
    return <>
        <DrawerToggleButton onOpen={onOpen}/>
        <ContentOfDrawer isOpen={isOpen} onClose={onClose}/>
    </>
};
