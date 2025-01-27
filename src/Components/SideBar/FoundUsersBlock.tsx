import React from 'react';
import {DialogPreviewPlate} from "./DialogPreviewPlate";
import {Divider} from "@chakra-ui/react";
import {user, useUserStore} from "../../lib/hooks/useUserStore";
import {arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../lib/configs/firebase";


export const FoundUsersBlock = ({foundUsers}: {foundUsers:user[]}) => {
    const {user} = useUserStore()
    const startDialog = async (foundUserId: string) => {
        const dialogRef = collection(db, "dialogs")
        const userDialogsRef = collection(db, "userDialogs")
        try {
            const newDialogRef = doc(dialogRef)
            await setDoc(newDialogRef, {
                createdAt: serverTimestamp(),
                messages: []
            })
            await updateDoc(doc(userDialogsRef, foundUserId), {
                dialogs: arrayUnion({
                    chatId: newDialogRef.id,
                    lastMessage: "",
                    receiverId: user!.id,
                    updatedAt: Date.now()
                })
            })
            await updateDoc(doc(userDialogsRef, user!.id), {
                dialogs: arrayUnion({
                    chatId: newDialogRef.id,
                    lastMessage: "",
                    receiverId: foundUserId,
                    updatedAt: Date.now()
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        {foundUsers.map(foundUser => <DialogPreviewPlate  dialogUser={foundUser} onPreviewClick={() => startDialog(foundUser.id)}/>)}
        {foundUsers.length ? <Divider/> : undefined}
        </>
};
