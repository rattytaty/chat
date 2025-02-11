import React, {ChangeEvent, FormEvent, useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile,} from "firebase/auth";
import {auth, db} from "../../lib/configs/firebase";
import {FirebaseError} from 'firebase/app';
import {doc, setDoc} from "firebase/firestore";
import {NavLink as ReactRouterLink, useNavigate} from "react-router-dom";
import {LoginRegisterFormLayout} from "./Login&RegisterFormLayout";
import {
    Button,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link as ChakraLink
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {StyledFormInput} from "./StyledFormInput";

type formData = {
    username: string,
    email: string,
    password: string
}

export const RegisterPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<formData>({
        username: "",
        email: "",
        password: ""
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
    };

    const checkFormData = () => {
        const regEx: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
        if (true) {

        }
    }


    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {username, email, password} = formData

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            /*await updateProfile(response.user, {
                username
            })*/
            await setDoc(doc(db, "users", response.user.uid), {
                avatar: null,
                username,
                email,
                id: response.user.uid,
                blockedUsersList: []
            });
            await setDoc(doc(db, "userDialogs", response.user.uid), {
                dialogs: []
            });
            //navigate("/")
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error)
                //const {code, message} = error
            }
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return <LoginRegisterFormLayout>
        <Heading color="text">Register</Heading>
        <form onSubmit={handleFormSubmit}>
            {/* <FormControl mb={4}>
                <FormErrorMessage>Have to be unique.</FormErrorMessage>
                </FormControl>*/}


            <StyledFormInput generalinfo="username"
                             value={formData.username}
                             onChange={handleChange}/>
            <StyledFormInput generalinfo="email"
                             value={formData.email}
                             onChange={handleChange}/>
            <FormControl>
                <InputGroup>
                    <StyledFormInput generalinfo="password"
                                     type={showPassword ? "text" : "password"}
                                     value={formData.password}
                                     onChange={handleChange}/>

                    <InputRightElement width="4.5rem"
                                       onClick={handleShowClick}>
                        {showPassword
                            ? <ViewOffIcon color="#F5F5F5"/>
                            : <ViewIcon color="#F5F5F5"/>}
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button borderRadius={5}
                    type="submit"
                    variant="solid"
                    bg="#2b5278"
                    _hover={{backgroundColor: "#3971a8"}}
                    color="#F5F5F5"
                    width="full">
                Register</Button>
        </form>
        <ChakraLink color="secondaryText"

                    as={ReactRouterLink}
                    to="/login">
            Have an account already?
        </ChakraLink>
    </LoginRegisterFormLayout>
};
