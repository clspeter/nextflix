import React, { useState } from 'react'
import './LoginScreen.css'
import SingupScreen from './SingupScreen'
import { useNavigate } from 'react-router-dom'


function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
    }

    const signInHandler = (e) => {
        e.preventDefault();
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
                                <input type="email" placeholder="Email or phone number" />
                                <input type="password" placeholder="Password" />
                                <button onClick={() => signInHandler()} type="submit">Sign In</button>
                                <h4>
                                    <span className="loginScreen_gray">New to Nextflix? </span>
                                    <span onClick={() => navigate('/')} className="loginScreen_link">Sign up now.</span>
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