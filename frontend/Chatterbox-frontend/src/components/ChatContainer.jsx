import { userChatContext } from "../context/userChatContext";
import { useContext, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { userAuthContext } from "../context/userAuthContext";

export default function ChatContainer() {
  const { messages, isMessagesLoading, getMessages, selectedUser } = useContext(userChatContext);
  const { user } = useContext(userAuthContext);
  const messageEndRef = useRef(null);

  function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return <div className="chat-container-loadingScreen flex-1 overflow-y-auto p-4 space-y-4"  >Loading...</div>;
  }

  return (
    <div className="chat-container border-black">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-container-bg ">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 text-black">
              { message.senderId === user._id ? '' : selectedUser.fullName }
              <time className="text-xs opacity-50 ml-1 text-black">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            <div ref={messageEndRef} />
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}
