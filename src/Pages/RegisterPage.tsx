import React from 'react';

export const RegisterPage = () => {
    return <div className="formsWrapper">
        <div className="formsContainer">
            <span className="formLogo">Chat App</span>
            <span className="formPageTitle">Register</span>
            <form>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Repeat password"/>
                <button>Sign in</button>
            </form>
            <span className="bottomText">Have an account already?</span>
        </div>
    </div>
};
