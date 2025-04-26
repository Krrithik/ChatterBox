import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';


export const userAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        setUser(response.data);
      } catch (error) {
        setUser(null);
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      setUser(res.userData);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

/*   const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }; */

  return( <>
  <userAuthContext.Provider value={{
        user,
        setUser,
        login
      }}>
  {loading ? <p> Loading ... </p> : children}
  </userAuthContext.Provider>
  </>);
  
};
