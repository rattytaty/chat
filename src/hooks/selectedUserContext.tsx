import {createContext, Dispatch, ReactNode, useReducer} from "react";
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



export const SelectedUserContext = createContext({}as {state:state, dispatch:Dispatch<actionType>})

type actionType = {
    type: string
    payload: {
        uid: string
        photoUrl: string | null
        displayName: string
    }}


export const SelectedUserContextProvider = (props: { children:ReactNode }) => {
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
            case "BACK_HOME":
                return {chatId:null,
                chatUser:action.payload as {
                    uid: string
                    photoUrl: string | null
                    displayName: string
                }
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




