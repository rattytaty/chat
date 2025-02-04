import React from 'react';
import {dialogPreview} from "./SideBar";
import {DialogPreviewPlate} from "./DialogPreviewPlate";
import {useDialogStore} from "../../lib/hooks/useDialogStore";
import {user} from "../../lib/hooks/useUserStore";

export const DialogPreviewsBlock = ({dialogPreviews}: { dialogPreviews: dialogPreview[] }) => {

    const {changeDialog} = useDialogStore()
    const selectDialog = (chatId: string, receiverUser: user) => {
        changeDialog(chatId, receiverUser)
    }


    return <>{
        dialogPreviews.map(dialogPreview => <DialogPreviewPlate key={dialogPreview.previewInfo.chatId}
                                                                dialogUser={dialogPreview.dialogUser}
                                                                onPreviewClick={() => selectDialog(dialogPreview.previewInfo.chatId, dialogPreview.dialogUser)}
                                                                previewInfo={dialogPreview.previewInfo}/>)
    }</>
};
