import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyB7TyaLr_lEOe1Ve9f5QZkh6tyf7SzY55I",
    authDomain: "mini-chat-238ae.firebaseapp.com",
    projectId: "mini-chat-238ae",
    storageBucket: "mini-chat-238ae.appspot.com",
    messagingSenderId: "378969368334",
    appId: "1:378969368334:web:7c5875849e3ed332ae195f"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage();

export const db = getFirestore(app);


