import React, {KeyboardEvent, useState} from 'react';
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase";
import {foundUser} from "../SideBar";

export const InputForUserSearch = ({setFoundUser}:{setFoundUser:(foundUser:foundUser)=>void}) => {

    const [userForSearch, setUserForSearch] = useState("");

    const handleUserSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && searchForUser()
    }

    const searchForUser = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userForSearch))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc =>
                setFoundUser(doc.data() as foundUser)
            )
        } catch (error) {
            console.log(error)
        }
    }

    return <InputGroup size="sm">
        <Input borderRadius="3xl"
               bg="inputBg"
               border="none"
               _focusVisible={{
                   outline: "none",
               }}
               _placeholder={{color: "#5A6670"}}
               textColor="text"
               placeholder="Search for a user"
               value={userForSearch}
               onChange={e => setUserForSearch(e.currentTarget.value)}
               onKeyDown={handleUserSearch}
        />
        <InputLeftElement pointerEvents="none">
            <Search2Icon color="#5A6670"/>
        </InputLeftElement>
    </InputGroup>
};
