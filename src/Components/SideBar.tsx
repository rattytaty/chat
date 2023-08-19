import React, {KeyboardEvent, useState} from 'react';
import {useUser} from "../useUser";
import {auth, db} from "../firebase";
import {signOut} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {collection, getDocs, query, where} from 'firebase/firestore';

export const SideBar = () => {

    const navigate = useNavigate()
    const user = useUser()
    const logOutHandler = () => {
        signOut(auth).then(() =>
            navigate("/login")
        )
    }
    const [userForSearch, setUserForSearch] = useState("");
    const [foundUser, setFoundUser] = useState<any>()
    const searchForUser = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userForSearch))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc =>
                setFoundUser(doc)
            )
        } catch (error) {
            console.log(error)
        }

    }
    const handleUserSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && searchForUser()
    }

    return <div className="sideBar">
        <div className="sideBarHeader">
            <div className="logo">Chat App</div>
            <div className="userInf">
                <span>{user?.displayName}</span>
                <button onClick={logOutHandler} className="primaryButton">Logout</button>
            </div>
        </div>

        <div style={{overflowY: "auto", overflowX: "hidden"}}>
            {foundUser && <div className="userBlock">
                <img className="userImg"
                     src={"https://www.readersdigest.ca/wp-content/uploads/2017/08/being-a-good-person.jpg"}/>
                <div className="info">
                    <div>{foundUser.dispayName}</div>
                    <span>Last Message</span>
                </div>

            </div>}
        </div>

        <input className="searchUser"
               placeholder="Search User"
               value={userForSearch}
               onChange={e => setUserForSearch(e.currentTarget.value)}
               onKeyDown={handleUserSearch}
        />
    </div>

};
