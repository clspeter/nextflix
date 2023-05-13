import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Plans from '../components/Plans'
import { useSelector } from "react-redux"
import { selectUser } from "../features/userSlice"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { redirect } from "react-router-dom"
import "./ProfileScreen.css"


function ProfileScreen() {
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            redirect("/")
        }
    }, [user])
    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen_body">
                <h1>Edit Profile</h1>
                <div className="profileScreen_info">
                    <img src="/nextflix-avatar.png" alt="" />
                    <div className="profileScreen_details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen_plans">
                            <h3>Plans(Crrent Plain:)</h3>
                            <Plans />
                            <button className="profileScreen_signOut" onClick={() => signOut(auth)}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen