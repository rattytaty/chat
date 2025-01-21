import React from 'react';
import {LoginRegisterFormLayout} from '../Components/Login&RegisterFormLayout';
import {Button, Heading, Switch, useColorMode} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const SettingsPage = () => {
    const navigate = useNavigate()
    const {toggleColorMode} = useColorMode();
    return <LoginRegisterFormLayout>
        <Heading color="text">Settings</Heading>
        <Switch id="dark_mode"
                size="lg"
                onChange={toggleColorMode}/>
        <Button borderRadius={5}
                variant="solid"
                bg="#2b5278"
                _hover={{backgroundColor: "#3971a8"}}
                color="#F5F5F5"
                onClick={() => navigate("/")}>
            Save settings</Button>
    </LoginRegisterFormLayout>
};

export default SettingsPage;