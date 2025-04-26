import { userAuthContext } from "../context/userAuthContext"
import { useContext } from "react"

export default function ProfilePage(){
    const {user} = useContext(userAuthContext)

    return (
        <>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>View and edit your profile information here.</p>
        <h3 className="text-red-500">{user.fullName}</h3>
        </>
    )
}
