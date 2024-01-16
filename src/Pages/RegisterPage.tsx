import React, {ChangeEvent, FormEvent, useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile,} from "firebase/auth";
import {auth, db} from "../firebase";
import {FirebaseError} from 'firebase/app';
import {doc, setDoc} from "firebase/firestore";
import {NavLink as ReactRouterLink, useNavigate} from "react-router-dom";
import {FormLayout} from "../Components/FormLayout";
import {Button, FormControl, Heading, Input, InputGroup, InputRightElement, Link as ChakraLink} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";


type formData = {
    nickname: string,
    email: string,
    password: string
}

export const RegisterPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<formData>({
        nickname: "",
        email: "",
        password: ""
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {nickname, email, password} = formData
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(response.user, {
                displayName: nickname
            })

            await setDoc(doc(db, "users", response.user.uid), {
                displayName: nickname,
                email,
                uid: response.user.uid,
                photoUrl: null
            });
            await setDoc(doc(db, "usersChats", response.user.uid), {});

            navigate("/")

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
        <Heading color="#F5F5F5">Register</Heading>

        <form onSubmit={handleFormSubmit}>

           {/* <FormControl mb={4}>
                <FormErrorMessage>Have to be unique.</FormErrorMessage>
                </FormControl>*/}

            <Input placeholder="Nickname"
                   id="nickname"
                   name="nickname"
                   value={formData.nickname}
                   onChange={handleChange}
                   type="text"
                   borderStyle="none"
                   color="#F5F5F5"
                   focusBorderColor="#0A121B"
                   _hover={{borderColor: "none"}}
                   bg="#1B2734"
                   mb={4}
            />
            <Input type="email"
                   placeholder="Email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   borderStyle="none"
                   color="#F5F5F5"
                   focusBorderColor="#0A121B"
                   _hover={{borderColor: "none"}}
                   bg="#1B2734"
                   mb={4}
            />
            <FormControl>
                <InputGroup>
                    <Input type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           id="password"
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           borderStyle="none"
                           color="#F5F5F5"
                           focusBorderColor="#0A121B"
                           _hover={{borderColor: "none"}}
                           bg="#1B2734"
                           mb={4}
                    />
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
                Login</Button>
        </form>
        <ChakraLink color="#F5F5F5"
                    as={ReactRouterLink}
                    to="/login">
            Have an account already?</ChakraLink>
    </FormLayout>
};
