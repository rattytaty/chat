import React, {useContext, useEffect, useRef, useState} from 'react';
import {MessagesBlock} from "./MessagesBlock";
import {SelectedUserContext} from "../hooks/selectedUserContext";
import anonUser from '../accets/anonUser.svg'
import {arrayUnion, doc, serverTimestamp, Timestamp, updateDoc} from "firebase/firestore";
import {db, storage} from "../firebase";
import {useUser} from "../hooks/useUser";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {v4} from "uuid";


export const Chats = () => {
    const user = useUser();

    const {state} = useContext(SelectedUserContext)
    const [msgText, setMsgText] = useState("")
    const [img, setImg] = useState<File|null>(null)
    const sendMsg = async () => {
        if (img) {
            const storageRef = ref(storage, v4())
            const uploadImg = uploadBytesResumable(storageRef, img)
            uploadImg.on("state_changed", () => {
                getDownloadURL(uploadImg.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", state.chatId as string), {
                        messages: arrayUnion({
                            id: v4(),
                            msgText,
                            senderId: user!.uid,
                            date: Timestamp.now(),
                            img: downloadURL
                        })
                    })
                })
            })
        } else {
            await updateDoc(doc(db, "chats", state.chatId as string), {
                messages: arrayUnion({
                    id: v4(),
                    msgText,
                    senderId: user!.uid,
                    date: Timestamp.now()
                })
            })
        }

        await Promise.allSettled([ await updateDoc(doc(db, "usersChats", user!.uid),{
            [state.chatId+".lastMessage"]:{msgText},
            [state.chatId+".date"]:Timestamp.now()
        }),
            await updateDoc(doc(db, "usersChats", state.chatUser.uid),{
                [state.chatId+".lastMessage"]:{msgText},
                [state.chatId+".date"]:Timestamp.now()
            })])

        setImg(null)
        setMsgText("")
    }



    return <div className="chats">{state.chatId&&<><div className="chatInfo">
            <div className="userInfo">
                <img className="userImg"
                     src={state.chatUser.photoUrl ? state.chatUser.photoUrl : anonUser}/>
                <span>{state.chatUser.displayName}</span>
            </div>

            <button className="primaryButton">change</button>
        </div>
            <MessagesBlock/>
            <div className="inputBlock">
                <div className="inputContainer">

                    <input type="file"
                           style={{display: "none"}}
                           id="file"
                           onChange={event => {
                               if (event.currentTarget.files) {
                                   setImg(event.currentTarget.files[0])
                               }
                           }}/>
                    <label htmlFor="file">
                        <button className="primaryButton">Attach</button>
                    </label>


                    <input placeholder="Write down a message..."
                           value={msgText}
                           onChange={event => setMsgText(event.currentTarget.value)}
                           onKeyDown={event => event.code==="Enter"&&sendMsg()}
                    />
                </div>
                <button className="primaryButton"
                        onClick={sendMsg}
                >Send
                </button>
            </div></>}
    </div>}
