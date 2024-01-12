import React, {ChangeEvent, FormEvent, useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile,} from "firebase/auth";
import {auth, db} from "../firebase";
import {FirebaseError} from 'firebase/app';
import {doc, setDoc} from "firebase/firestore";
import {NavLink, useNavigate} from "react-router-dom";
import {FormLayout} from "../Components/FormLayout";

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
                displayName:nickname,
                email,
                uid: response.user.uid,
                photoUrl:null
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

    return <FormLayout>

            <span >Register</span>
            <form onSubmit={handleFormSubmit}>
                <input type="text"
                       placeholder="Nickname"
                       id="nickname"
                       name="nickname"
                       value={formData.nickname}
                       onChange={handleChange}/>
                <input type="email"
                       placeholder="Email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}/>
                <input type="password"
                       placeholder="Password"
                       id="password"
                       name="password"
                       value={formData.password}
                       onChange={handleChange}/>
                <button type="submit">Sign in</button>
            </form>
            <NavLink to="/login">Have an account already?</NavLink>
    </FormLayout>
};
