import {createContext, ReactNode, useEffect, useState} from "react";
import {auth} from "../../lib/firebase";
import {onAuthStateChanged, User} from "firebase/auth"

export const UserContext = createContext<User | null>(null)

export const UserContextProvider = ({children}: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(auth.currentUser)
    useEffect(() => {
        onAuthStateChanged(auth, user =>

            setUser(user)
        )
    }, [user]);


    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
}