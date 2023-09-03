import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useUser} from "../hooks/useUser";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {FirebaseError} from "firebase/app";

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
        const { email, password} = formData
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error)
                //const {code, message} = error
            }
        }
    }


    return <div className="formsWrapper">
        <div className="formsContainer">
            <span className="formLogo">Chat App</span>
            <span className="formPageTitle">Login</span>
            <form onSubmit={handleFormSubmit}>
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
                <button type="submit">Sign up</button>
            </form>
            <span>Log in to existing acc:</span>
            <div style={{display:"flex", gap:"50px"}}>
                <div>
                    <div>johndoe@gmail.com</div>
                    <div>JohnDoe</div>
                </div>
                <div>
                    <div>janedoe@gmail.com</div>
                    <div>JaneDoe</div>
                </div>


            </div>
            <NavLink to="/register" className="bottomText">Or create a new account.</NavLink>
        </div>
    </div>
};