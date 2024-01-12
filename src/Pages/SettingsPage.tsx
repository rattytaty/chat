import React from 'react';
import { FormLayout } from '../Components/FormLayout';
import {Button, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const SettingsPage = () => {
    const navigate = useNavigate()
    return (
        <FormLayout>
           <Text color="#F5F5F5">Settings</Text>
            <Button borderRadius={5}
                    variant="solid"
                    bg="#2b5278"
                    _hover={{backgroundColor: "#3971a8"}}
                    color="#F5F5F5"
                    onClick={()=>navigate("/")}
            >
                Save settings</Button>
            </FormLayout>
    );
};

export default SettingsPage;