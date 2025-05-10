import React, { createContext, useState, useEffect, useRef } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const userAuthContext = createContext();

const baseURL = 'http://localhost:5050'

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const socketRef = useRef(null)


  function connectSocket(userId){

    if(!userId || socketRef.current?.connected){
      return
    }

    socketRef.current = io(baseURL , {
      query: { userId },
      withCredentials: true,
    })

    socketRef.current.connect()


  }


  function disconnectSocket(){
    if(socketRef.current?.connected){
      socketRef.current.disconnect();
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        setUser(response.data);
        connectSocket(response.data._id)
      } catch (error) {
        setUser(null);
        disconnectSocket()
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUser();

    return () => {
      disconnectSocket();
    }
  }, []);

  // Auth actions
  const signup = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/signup", userData);
      setUser(res.data);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const login = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      setUser(res.data);
      toast.success("Logged in successfully");
      connectSocket(res.data._id)


    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      <userAuthContext.Provider
        value={{
          loading,
          user,
          setUser,
          signup,
          login,
          logout,
          socket : socketRef.current
        }}
      >
        {loading ? <p> Loading ... </p> : children}
      </userAuthContext.Provider>
    </>
  );
};
