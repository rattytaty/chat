import {useEffect, useState} from "react";
import {auth} from "./firebase";
import {onAuthStateChanged} from "firebase/auth"
import {User} from "firebase/auth"

export const useUser = () => {

    const [user, setUser] = useState(auth.currentUser)
    useEffect(() => {
        onAuthStateChanged(auth, user =>
            setUser(user)
        )
        console.log("user", user)
    }, [user]);


    return user
}