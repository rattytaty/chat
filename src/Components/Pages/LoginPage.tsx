import React, {ChangeEvent, FormEvent, useState} from 'react';
import {NavLink as ReactRouterLink, useNavigate} from "react-router-dom";

import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../lib/configs/firebase";
import {FirebaseError} from "firebase/app";
import {
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    Heading,
    InputGroup,
    InputRightElement,
    Link as ChakraLink,
    Text
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {LoginRegisterFormLayout} from "./Login&RegisterFormLayout";
import {StyledFormInput} from "./StyledFormInput";

type formData = {
    email: string,
    password: string
}
export const LoginPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<formData>({
        email: "",
        password: ""
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {email, password} = formData
        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => navigate("/"))
        } catch (error) {
            if (error instanceof FirebaseError) {
                //const {code, message} = error
            }
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const LoginHelper = <FormHelperText justifyContent="center"
                                        color="text">
        <Text textAlign="center">Login to existing acc:</Text>
        <Flex direction="row"
              justifyContent="center"
              textAlign="center"
              p={2}
              gap={6}>
            <Flex direction="column"
                  p={2}
                  cursor="pointer"
                  onClick={() => {
                      setFormData({email: "johndoe@gmail.com", password: "JohnDoe"})
                  }}>
                <Text>johndoe@gmail.com</Text>
                <Text>JohnDoe</Text>
            </Flex>
            <Center height="60px">
                <Divider orientation="vertical"/>
            </Center>
            <Flex direction="column"
                  p={2}
                  cursor="pointer"
                  onClick={() => {
                      setFormData({email: "janedoe@gmail.com", password: "JaneDoe"})
                  }}>
                <Text>janedoe@gmail.com</Text>
                <Text>JaneDoe</Text>
            </Flex>
        </Flex>
    </FormHelperText>

    return <LoginRegisterFormLayout>
        <Heading color="text">Login</Heading>
        <form onSubmit={handleFormSubmit}>
            <StyledFormInput generalinfo="email"
                             value={formData.email}
                             onChange={handleChange}
            />
            <FormControl>
                <InputGroup>
                    <StyledFormInput generalinfo="password"
                                     type={showPassword ? "text" : "password"}
                                     value={formData.password}
                                     onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem"
                                       onClick={handleShowClick}>
                        {showPassword
                            ? <ViewOffIcon color="#F5F5F5"/>
                            : <ViewIcon color="#F5F5F5"/>}
                    </InputRightElement>
                </InputGroup>
                {LoginHelper}
            </FormControl>
            <Button borderRadius={5}
                    type="submit"
                    variant="solid"
                    bg="#658adf"
                    _hover={{backgroundColor: "#3971a8"}}
                    color="#F5F5F5"
                    width="full">
                Login</Button>
        </form>
        <ChakraLink color="secondaryText"
                    style={{textDecoration: "underline"}}
                    _hover={{color: "#3971a8"}}
                    as={ReactRouterLink}
                    to="/register">
            Or create a new account.
        </ChakraLink>
    </LoginRegisterFormLayout>
};