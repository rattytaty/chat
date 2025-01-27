import React from 'react';
import {dialogPreview} from "./SideBar";
import {DialogPreviewPlate} from "./DialogPreviewPlate";

export const DialogPreviewsBlock = ({dialogPreviews}: { dialogPreviews: dialogPreview[] }) => {

    return <>{
        dialogPreviews.map(dialogPreview => <DialogPreviewPlate key={dialogPreview.previewInfo.chatId} dialogUser={dialogPreview.dialogUser}
                                                                onPreviewClick={() => {
                                                                }}
                                                                previewInfo={dialogPreview.previewInfo}/>)
    }</>
};
