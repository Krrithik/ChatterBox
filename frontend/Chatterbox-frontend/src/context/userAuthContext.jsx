import React, {
    createContext,
    useState,
    useEffect
} from "react";
import {
    axiosInstance
} from "../lib/axios";
import {
    toast
} from 'react-hot-toast';

export const userAuthContext = createContext();

export const UserAuthProvider = ({
    children
}) => {
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

    // Auth actions
    const signup = async (userData) => {
        try {
            const res = await axiosInstance.post("/auth/signup", userData);
            setUser(res.data);
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error ?. response ?. data ?. message || "Signup failed");
        }
    };

    const login = async (userData) => {
        try {
            const res = await axiosInstance.post("/auth/login", userData);
            setUser(res.data);
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error ?. response ?. data ?. message || "Login failed");
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            setUser(null);
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error ?. response ?. data ?. message || "Logout failed");
        }
    };

    return( <>
        <userAuthContext.Provider value={{
             loading,
              user,
              setUser,
              signup,
              login,
              logout
            }}>
        {loading ? <p> Loading ... </p> : children}
        </userAuthContext.Provider>
        </>);
};
