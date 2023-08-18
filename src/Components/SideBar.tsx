import React from 'react';

export const SideBar = () => {
    return <div className="sideBar">
        <div className="sideBarHeader">
            <div className="logo">Chat App</div>
            <div className="userInf">
                <span>UserName</span>
                <button className="primaryButton">Logout</button>
            </div>
        </div>

        <div style={{overflowY: "auto", overflowX: "hidden"}}>
            <div className="userBlock">
                <img className="userImg"
                     src={"https://www.readersdigest.ca/wp-content/uploads/2017/08/being-a-good-person.jpg"}/>
                <div className="info">
                    <div>User Name</div>
                    <span>Last Message</span>
                </div>

            </div>
        </div>


        <input className="searchUser" placeholder="Search User"/>
    </div>

};
