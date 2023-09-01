import React, {KeyboardEvent, useContext, useEffect, useState} from 'react';
import {useUser} from "../hooks/useUser";
import {auth, db} from "../firebase";
import {signOut} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';

import anonUser from '../accets/anonUser.svg'
import {SelectedUserContext} from "../hooks/selectedUserContext";

type foundUser = {
    displayName: string
    email: string
    uid: string
    photoUrl: string
}


interface chat {
    [key: string]: {
        date: {
            second: string
            nanoseconds: string
        }
        userInfo: {
            uid: string
            photoUrl: string | null
            displayName: string
        }
    }
}

export const SideBar = () => {

    const {dispatch} = useContext(SelectedUserContext)
    const navigate = useNavigate()
    const user = useUser()
    const logOutHandler = () => {
        signOut(auth).then(() =>
            navigate("/login")
        )
    }
    const [userForSearch, setUserForSearch] = useState("");
    const [foundUser, setFoundUser] = useState<foundUser | null>(null)
    const searchForUser = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userForSearch))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc =>
                setFoundUser(doc.data() as foundUser)
            )
        } catch (error) {
            console.log(error)
        }

    }
    const handleUserSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && searchForUser()
    }
    const selectFoundUser = async (userInfo: {
        uid: string
        photoUrl: string | null
        displayName: string
    }) => {
        const combinedId = user!.uid > foundUser!.uid
            ? user!.uid + foundUser!.uid
            : foundUser!.uid + user!.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages: []})
                await updateDoc(doc(db, "usersChats", user!.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: foundUser!.uid,
                        displayName: foundUser!.displayName,
                        photoUrl: foundUser!.photoUrl,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "usersChats", foundUser!.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user!.uid,
                        displayName: user!.displayName,
                        photoUrl: user!.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
            dispatch({type: "CHANGE_USER", payload: userInfo})
        } catch (e) {
        }
        setFoundUser(null)
    }
    const [chats, setChats] = useState<chat>()
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", user!.uid), (doc) => {
                setChats(doc.data())
            })
            return () => unsub()
        }
        user?.uid && getChats()
    }, [user])

    const selectChat = (userInfo: {
        uid: string
        photoUrl: string | null
        displayName: string
    }) => {
        dispatch({type: "CHANGE_USER", payload: userInfo})
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

            {foundUser && <div className="userBlock"
                               onClick={()=>selectFoundUser(foundUser)}
            >
                <img className="userImg"
                     src={foundUser.photoUrl ? foundUser.photoUrl : anonUser}/>
                <div className="info">
                    <div>{foundUser.displayName}</div>
                </div>

            </div>}

            {chats && Object.entries(chats)?.map(chat =>
                <div className="userBlock"
                     key={chat[0]}
                     onClick={() => selectChat(chat[1].userInfo)}
                >
                    <img className="userImg"
                         src={chat[1].userInfo.photoUrl ? chat[1].userInfo.photoUrl : anonUser}/>
                    <div className="info">
                        <div>{chat[1].userInfo.displayName}</div>
                        <span>{}</span>
                    </div>
                </div>)}
        </div>

        <input className="searchUser"
               placeholder="Search User"
               value={userForSearch}
               onChange={e => setUserForSearch(e.currentTarget.value)}
               onKeyDown={handleUserSearch}
        />
    </div>

};
