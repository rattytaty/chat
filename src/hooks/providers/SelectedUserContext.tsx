import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";
import {UserContext} from "./UserContext";

export type selectedUser = {
    uid: string
    photoUrl: string | null
    displayName: string
}

type state = {
    chatId: string | null
    chatUser: selectedUser
}

type actionType = {
    type: string
    payload: selectedUser
}

const initialState: state = {
    chatId: null,
    chatUser: {} as selectedUser
}

export const SelectedUserContext = createContext({} as { selectedChat: state, dispatch: Dispatch<actionType> })

export const SelectedUserContextProvider = ({children}: { children: ReactNode }) => {

    const user = useContext(UserContext)

    const reducer = (selectedChat: state, action: actionType): state => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    chatId: user!.uid > action.payload.uid
                        ? user!.uid + action.payload.uid
                        : action.payload.uid + user!.uid,
                    chatUser: action.payload
                }
            case "BACK_HOME":
                return {
                    chatId: null,
                    chatUser: action.payload
                }
            default:
                return selectedChat
        }
    }

    const [selectedChat, dispatch] = useReducer(reducer, initialState)

    return <SelectedUserContext.Provider value={{selectedChat, dispatch}}>
        {children}
    </SelectedUserContext.Provider>
}