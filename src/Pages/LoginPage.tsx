import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react';
import {NavLink as ReactRouterLink, useNavigate} from "react-router-dom";
import {UserContext} from "../hooks/providers/UserContext";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {FirebaseError} from "firebase/app";
import {
    Avatar,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link as ChakraLink,
    Text
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {FormLayout} from "../Components/FormLayout";

type formData = {
    email: string,
    password: string
}
export const LoginPage = () => {

    const user = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate]);
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
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error)
                //const {code, message} = error
            }
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return <FormLayout>
        <Heading color="text">Login</Heading>
        <Avatar/>
        <form onSubmit={handleFormSubmit}>
            <Input type="email"
                   placeholder="Email"
                   id="email"
                   name="email"
                   value={formData.email}
                   mb={4}
                   onChange={handleChange}
                   border="none"
                   _focusVisible={{
                       outline: "none",
                   }}
                   _placeholder={{color:"#F5F5F5"}}
                   color="text"
                   bg="inputBg"
            />
            <FormControl>
                <InputGroup>
                    <Input type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           id="password"
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           color="text"
                           border="none"
                           _focusVisible={{
                               outline: "none",
                           }}
                           _placeholder={{color:"#F5F5F5"}}
                           bg="inputBg"
                    />
                    <InputRightElement width="4.5rem"
                                       onClick={handleShowClick}>
                        {showPassword
                            ? <ViewOffIcon color="#F5F5F5"/>
                            : <ViewIcon color="#F5F5F5"/>}
                    </InputRightElement>
                </InputGroup>
                <FormHelperText justifyContent="center"
                                color="text">
                    <Text textAlign="center">Login to existing acc:</Text>
                    <Flex direction="row"
                          justifyContent="center"
                          textAlign="center"
                          p={4}
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
            </FormControl>
            <Button borderRadius={5}
                    type="submit"
                    variant="solid"
                    bg="#2b5278"
                    _hover={{backgroundColor: "#3971a8"}}
                    color="#F5F5F5"
                    width="full">
                Login</Button>
        </form>
        <ChakraLink color="text"
                    as={ReactRouterLink}
                    to="/register">
            Or create a new account.</ChakraLink>
    </FormLayout>
};