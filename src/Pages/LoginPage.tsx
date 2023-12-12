import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {NavLink as ReactRouterLink, useNavigate} from "react-router-dom";
import {useUser} from "../hooks/useUser";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {FirebaseError} from "firebase/app";
import {
    Avatar,
    Box,
    Button, Center,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link as ChakraLink,
    Stack,
    Switch,
    Text,
    useColorMode
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';

type formData = {
    email: string,
    password: string
}
export const LoginPage = () => {

    const user = useUser()
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

    /* const {toggleColorMode} = useColorMode();
     <Switch
         id="dark_mode"
         colorScheme="teal"
         size="lg"
         onChange={toggleColorMode}
     />
     */

    return <div>
        <Flex flexDirection="column"
              width="100wh"
              height="100vh"
              backgroundColor="#0E1621"
              justifyContent="center"
              alignItems="center">
            <Stack flexDir="column"
                   mb="2"
                   justifyContent="center"
                   alignItems="center">
                <Heading color="#6AB3F3">Chat app</Heading>
                <Box minW={{base: "90%", md: "468px"}}>
                    <form onSubmit={handleFormSubmit}>
                        <Stack borderRadius="xl"
                               spacing={4}
                               p="1rem"
                               backgroundColor="#242F3D"
                               boxShadow="md"
                               alignItems="center">
                            <Heading color="#F5F5F5">Login</Heading>
                            <Avatar/>
                            <FormControl>
                                <InputGroup>
                                    <Input type="email"
                                        placeholder="Email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        color="#F5F5F5"
                                        bg="#1B2734"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input color="#F5F5F5"
                                        bg="#1B2734"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}/>
                                    <InputRightElement width="4.5rem"
                                                       onClick={handleShowClick}>
                                        {showPassword
                                            ? <ViewOffIcon color="#F5F5F5"/>
                                            : <ViewIcon color="#F5F5F5"/>}
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText justifyContent={"center"}
                                                color="gray.300">
                                    <Text textAlign={"center"}>Log in to existing acc:</Text>
                                    <Flex direction='row'
                                          justifyContent={"center"}
                                          textAlign={"center"}
                                          p={4}
                                          gap={6}>
                                        <Flex direction='column'
                                              p={2}
                                              cursor={"pointer"}
                                              onClick={() => {
                                            setFormData({email: "johndoe@gmail.com", password: "JohnDoe"})
                                        }}>
                                            <Text>johndoe@gmail.com</Text>
                                            <Text>JohnDoe</Text>
                                        </Flex>
                                        <Center height='60px'>
                                            <Divider orientation='vertical'/>
                                        </Center>
                                        <Flex direction='column'
                                              p={2}
                                              cursor={"pointer"}
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
                                    bg="#6AB3F3"
                                    width="full">Login</Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <ChakraLink color={"#F5F5F5"} as={ReactRouterLink} to='/register'>
                Or create a new account.
            </ChakraLink>
        </Flex>

    </div>
};