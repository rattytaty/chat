import React from 'react';
import {dialogPreview} from "./SideBar";
import {DialogPreviewPlate} from "./DialogPreviewPlate";
import {useDialogStore} from "../../lib/hooks/useDialogStore";
import {user} from "../../lib/hooks/useUserStore";

export const DialogPreviewsBlock = ({dialogPreviews}: { dialogPreviews: dialogPreview[] }) => {

    const {changeDialog} = useDialogStore()
    const selectDialog = (dialogId: string, receiverUser: user) => {
        changeDialog(dialogId, receiverUser)
    }


    return <>{
        dialogPreviews.map(dialogPreview => <DialogPreviewPlate key={dialogPreview.previewInfo.dialogId}
                                                                dialogUser={dialogPreview.dialogUser}
                                                                onPreviewClick={() => selectDialog(dialogPreview.previewInfo.dialogId, dialogPreview.dialogUser)}
                                                                previewInfo={dialogPreview.previewInfo}/>)
    }</>
};
