import NavBar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"

import { Routes, Route, Navigate } from "react-router-dom"


import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

import { userAuthContext } from "./context/userAuthContext"
import { useContext } from "react"


const App = () => {
const {user, loading} = useContext(userAuthContext)

if (loading) {
  return (
    <>
      <p>Loading...</p>
      </>
  )
  }


  return (

    <>
    <div>
      <NavBar/>

      <Routes>
        <Route path="/" element={ user ? <HomePage /> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={ user ? <Navigate to="/"/> : <SignUpPage />}/>
        <Route path="/login" element={ user ? <Navigate to="/"/> : <LoginPage />}/>
        <Route path="/settings" element={user ?  <SettingsPage /> : <Navigate to="/login"/>}/>
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login"/>}/>
      </Routes>

      <Toaster />
    </div>


    </>
  )
}

export default App