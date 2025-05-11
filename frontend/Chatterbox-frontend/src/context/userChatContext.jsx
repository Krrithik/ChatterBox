import React, { createContext, useEffect, useState, useCallback, useContext } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { userAuthContext } from "./userAuthContext";
/* import { useAuthStore } from "./useAuthStore"; // Only needed for socket, see note below */

export const userChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);


  const { socket, user, onlineUsers } = useContext(userAuthContext)
 

  // Fetch users for sidebar
  async function getUsers() {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get("/messages/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      setIsUsersLoading(false);
    }
  }

  // Fetch messages with a specific user
  const getMessages = useCallback(async (userId) => {
    setIsMessagesLoading(true);
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      setIsMessagesLoading(false);
    }
  }, []);

  // Send a new message
  async function sendMessage(messageData) {
    if(!selectedUser){
        return
    }


console.table([
  {
    "To User ID": selectedUser.fullName,
    "Message Text": messageData.text,
    "Online": onlineUsers.includes(selectedUser._id),
  }
]);


    try {
        const res = await axiosInstance.post(
            `messages/send/${selectedUser._id}`,messageData
        )
        setMessages((prev) => [...prev, res.data])
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to send message')
    }
  }


   useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (
        selectedUser &&
        (message.senderId === selectedUser._id ||
          message.receiverId === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  useEffect(() => {
    getUsers();
  }, [])


  // Provide the state and actions
  return (
    <userChatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
      }}
    >
      {children}
    </userChatContext.Provider>
  );
};
