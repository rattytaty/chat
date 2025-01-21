import {create} from "zustand/react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../lib/firebase";

type user = {
    avatar: string | null,
    username: string,
    email: string,
    id: string
    blockedUsersList: string[]
}

type userStore = {
    user: user | null
    isLoading: boolean
    fetchUserInfo: (uId: any) => void
}


export const useUserStore = create<userStore>()((setState, getState, store) => ({
    user: null,
    isLoading: true,
    fetchUserInfo: async (uId: any) => {
        if (!uId) {
            return setState({
                user: null,
                isLoading: false
            })
        }
        try {
            const docRef = doc(db, "users", uId)
            const docSpan = await getDoc(docRef)
            if (docSpan.exists()) {
                setState({
                    user: docSpan.data() as user,
                    isLoading: false
                })
            } else {
                setState({
                    user: null,
                    isLoading: false
                })
            }

        } catch (error) {
            console.log(error)
            return setState({
                user: null,
                isLoading: false
            })
        }

    },
}))