import {formatDateToHHMM} from "./formatDateToHHMM";
import {formatDateToDDMM} from "./formatDateToDDMM";

export const returnFormatedTime =(ms:number):string=>{
    const dateOfMessage = new Date(ms);
    const todayDate = new Date()
    const isMessageToday = todayDate.getDate() === dateOfMessage.getDate() && todayDate.getMonth() === dateOfMessage.getMonth() && todayDate.getFullYear() === dateOfMessage.getFullYear()
    return isMessageToday
        ? formatDateToHHMM(dateOfMessage)
        : formatDateToDDMM(dateOfMessage)
}