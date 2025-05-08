import { userChatContext } from "../context/userChatContext"
import { useContext, useEffect } from "react"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"

export default function ChatContainer(){

  const { messages, isMessagesLoading, getMessages, selectedUser } = useContext(userChatContext)

  useEffect(()=> {
    getMessages(selectedUser._id)
  }, [/* selectedUser._id, getMessages */])

  if (isMessagesLoading) {
    return <div>Loading...</div>
  }

    return (
        <>
        <div className="chat-container">
         <h1 className="text-2xl font-bold">ChatContainer</h1>
         <ChatHeader />
         <p>messages from chat container ....</p>
         <MessageInput />
         </div>
         
        </>
    )
}