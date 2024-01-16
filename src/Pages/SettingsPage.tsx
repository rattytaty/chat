import React from 'react';
import { FormLayout } from '../Components/FormLayout';
import {Button, Switch, Text, useColorMode} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const SettingsPage = () => {
    const navigate = useNavigate()
    const {toggleColorMode} = useColorMode();
    return <FormLayout>
           <Text color="text">Settings</Text>
            <Switch id="dark_mode"
                size="lg"
                onChange={toggleColorMode}
            />
            <Button borderRadius={5}
                    variant="solid"
                    bg="#2b5278"
                    _hover={{backgroundColor: "#3971a8"}}
                    color="text"
                    onClick={()=>navigate("/")}
            >
                Save settings</Button>
            </FormLayout>
};

export default SettingsPage;