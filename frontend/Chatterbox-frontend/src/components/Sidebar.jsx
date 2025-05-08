import { useContext, useEffect } from "react"
import { userChatContext } from "../context/userChatContext"

export default function Sidebar(){
const { getUsers, users, selectedUser, isUserLoading } = useContext(userChatContext)

const onlineUsers = []

useEffect(() => {
    getUsers()
}, [getUsers])

if(isUserLoading){
    return <div>Loading...</div>
}

return (
        <>
        <aside>
         <h1 className="text-2xl font-bold">SideBar</h1>
         <p>Need to do chats here</p>
         </aside>
         
        </>
    )
}