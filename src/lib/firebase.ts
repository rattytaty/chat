import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "chat-react-1fe50.firebaseapp.com",
    projectId: "chat-react-1fe50",
    storageBucket: "chat-react-1fe50.firebasestorage.app",
    messagingSenderId: "529763193647",
    appId: "1:529763193647:web:3c2a977ace6cac52a947da"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app);