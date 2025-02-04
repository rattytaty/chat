import {create} from "zustand/react";
import {user, useUserStore} from "./useUserStore";

type dialogStore = {
    dialogId: string | null
    receiverUser: user | null
    isUserBlocked: boolean
    isReceiverBlocked: boolean
    changeDialog: (chatId: string | null, receiverUser: user | null) => void
    changeBlocked: () => void
}

export const useDialogStore = create<dialogStore>()((setState, getState, store) => ({
    dialogId: null,
    receiverUser: null,
    isReceiverBlocked: false,
    isUserBlocked: false,
    changeDialog: (dialogId, receiverUser) => {
        const user = useUserStore.getState().user
        if (!receiverUser) {
            return setState({
                dialogId: null,
                receiverUser: null,
                isReceiverBlocked: false,
                isUserBlocked: false,
            })
        }
        if (receiverUser.blockedUsersList.includes(user!.id)) {
            return setState({
                dialogId,
                receiverUser: null,
                isUserBlocked: true,
                isReceiverBlocked: false
            })
        }
        if (user!.blockedUsersList.includes(receiverUser.id)) {
            return setState({
                dialogId,
                receiverUser,
                isUserBlocked: false,
                isReceiverBlocked: true
            })
        }
        setState({
            dialogId,
            receiverUser,
            isUserBlocked: false,
            isReceiverBlocked: false
        })
    },
    changeBlocked: () => {
        setState(prevState => ({...prevState, isReceiverBlocked: !prevState.isReceiverBlocked,}))
    }

}))
