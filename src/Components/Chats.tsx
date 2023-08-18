import React from 'react';
import {MessagesBlock} from "./MessagesBlock";

export const Chats = () => {
    return <div className="chats">
        <div className="chatInfo">
            <div className="userInfo">
                <img className="userImg"
                     src={"https://www.readersdigest.ca/wp-content/uploads/2017/08/being-a-good-person.jpg"}/>
                <span>User Name</span>
            </div>

            <button className="primaryButton">change</button>
        </div>
        <MessagesBlock/>
        <div className="inputBlock">
            <div className="inputContainer">
                <button className="primaryButton">Attach</button>
                <input placeholder="Write down a message..."/>
            </div>
            <button className="primaryButton">Send</button>
        </div>
    </div>
};