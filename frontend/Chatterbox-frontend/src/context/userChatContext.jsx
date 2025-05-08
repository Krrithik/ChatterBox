import React, { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
/* import { useAuthStore } from "./useAuthStore"; // Only needed for socket, see note below */

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  // Fetch users for sidebar
  const getUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get("/messages/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      setIsUsersLoading(false);
    }
  }, []);

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
  const sendMessage = useCallback(async (messageData) => {
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  }, [selectedUser]);

  

  // Provide the state and actions
  return (
    <ChatContext.Provider
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
    </ChatContext.Provider>
  );
};
