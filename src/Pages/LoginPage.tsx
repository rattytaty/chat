import React from 'react';


export const LoginPage = () => {
    return <div className="formsWrapper">
            <div className="formsContainer">
                <span className="formLogo">Chat App</span>
                <span className="formPageTitle">Login</span>
                <form>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                <button>Sign up</button>
                </form>
                <span className="bottomText">Don't have an account?</span>
            </div>
        </div>
};