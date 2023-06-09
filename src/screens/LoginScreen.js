import React, { useState, useRef, useEffect } from 'react'
import './LoginScreen.css'
import SingupScreen from './SingupScreen'
import { useNavigate, redirect, useLocation } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux"
import { selectUser } from "../features/userSlice"

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const location = useLocation();

    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            redirect("/")
        }
    }, [user])

    useEffect(() => {
        if (location.state) {
            emailRef.current.value = location.state.email
        }
    }, [location])

    const signInHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate('/')
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    const registerHandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,
            emailRef.current.value, passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser)
                navigate('/')
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    if (signIn) {
        return (
            <SingupScreen />
        )
    }
    else {
        return (
            <div>
                <div className="loginScreen">
                    <img className="loginScreen_logo" src="/nextflix-logo.png" alt="" />
                    <div className="loginScreen_top" />
                    <div className="loginScreen_background">
                        <div className="loginScreen_gradient" />
                        <div className="loginScreen_body">
                            <form action="">
                                <h1>Sign In</h1>
                                <input type="email" placeholder="Email or phone number" ref={emailRef} />
                                <input type="password" placeholder="Password" ref={passwordRef} />
                                <button onClick={signInHandler} type="submit">Sign In</button>
                                <h4>
                                    <span className="loginScreen_gray">New to Nextflix? </span>
                                    <span onClick={registerHandler} className="loginScreen_link">Sign up now.</span>
                                </h4>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginScreen