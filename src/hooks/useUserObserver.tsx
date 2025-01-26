import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../lib/firebase";
import {useUserStore} from "./useUserStore";
import {useNavigate} from "react-router-dom";

export const useUserObserver = () => {
    const {fetchUserInfo} = useUserStore()
    const navigate = useNavigate()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
                if (!user) {
                    navigate("/login")
                    return
                }
                fetchUserInfo(user.uid)
            }
        )
        return () => {
            unsub()
        }
    }, [navigate, fetchUserInfo]);
}