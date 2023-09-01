import {createContext, useReducer} from "react";
import {useUser} from "./useUser";

const initialState: state = {
    chatId: null,
    chatUser: {} as {
        uid: string
        photoUrl: string | null
        displayName: string
    }
}
type state = {
    chatId: string | null
    chatUser: {
        uid: string
        photoUrl: string | null
        displayName: string
    }
}



export const SelectedUserContext = createContext({}as {state:state, dispatch:React.Dispatch<actionType>})

type actionType = {
    type: string
    payload: {
        uid: string
        photoUrl: string | null
        displayName: string
    }}


export const SelectedUserContextProvider = (props: { children: React.ReactNode }) => {
    const user = useUser()
    const reducer = (state: state, action: actionType): state => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    chatUser: action.payload,
                    chatId: user!.uid > action.payload.uid
                        ? user!.uid + action.payload.uid
                        : action.payload.uid + user!.uid
                }
            default:
                return state
        }
    }

const [state, dispatch] = useReducer(reducer, initialState)

    return <SelectedUserContext.Provider value={{state, dispatch}}>
        {props.children}
    </SelectedUserContext.Provider>
}




