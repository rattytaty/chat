import React, {KeyboardEvent, useState} from 'react';
import {Input, InputGroup, useColorModeValue} from "@chakra-ui/react";
import {CloseIcon, Search2Icon} from "@chakra-ui/icons";
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from "../../lib/configs/firebase";
import {user} from "../../lib/hooks/useUserStore";

type InputForUserSearchProps = {
    setFoundUsers: (foundUser: user[]) => void
}

export const InputForUserSearch = ({setFoundUsers}: InputForUserSearchProps) => {

    const [userForSearch, setUserForSearch] = useState("");
    const iconHoverColor = useColorModeValue('#2d2b2b', '#F5F5F5')
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && searchForUser()
    }

    const searchForUser = async () => {
        if (!userForSearch) return
        try {
            const userRef = collection(db, "users")
            const q = query(userRef, where("username", ">=", userForSearch), where('username', '<=', userForSearch + '~'))
            const querySnapshot = await getDocs(q)
            if (!querySnapshot.empty) {
                const arrOfFoundUsers: user[] = []
                querySnapshot.docs.map(el => {
                    arrOfFoundUsers.push(el.data() as user)

                })
                setFoundUsers(arrOfFoundUsers)
            }
        } catch (error) {


        }
    }

    const cancelSearch =() => {
        setUserForSearch("")
        setFoundUsers([])
    }

    return <InputGroup size="sm"
                       gap={1}
                       alignItems="center">
        <Input borderRadius="3xl"
               bg="inputBg"
               border="none"
               _focusVisible={{
                   outline: "none",
               }}
               _placeholder={{color: "#5A6670"}}
               textColor="text"
               placeholder="Search for a user..."
               value={userForSearch}
               onChange={e => setUserForSearch(e.currentTarget.value)}
               onKeyDown={handleKeyDown}
        />

        {userForSearch && <>
            <Search2Icon boxSize={5}
                         cursor="pointer"
                         color="icons"
                         _hover={{color: iconHoverColor}}
                         onClick={() => searchForUser()}/>
            <CloseIcon boxSize={5}
                       cursor="pointer"
                       color="icons"
                       _hover={{color: iconHoverColor}}
                       onClick={cancelSearch}
            />
        </>}
    </InputGroup>
};
