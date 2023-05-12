import React, { useState } from 'react'
import './LoginScreen.css'
import SingupScreen from './SingupScreen'


function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
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
                    <button className="login_button" onClick={() => setSignIn(true)}>Log In</button>
                    <div className="loginScreen_top" />
                    <div className="loginScreen_background">
                        <div className="loginScreen_gradient" />
                        <div className="loginScreen_body">
                            <h1>Unlimited films, TV shows, and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="loginScreen_input">
                                <form>
                                    <input type="email" placeholder="Email Address" />
                                    <button onClick={() => setSignIn(true)} className="loginScreen_getStarted">Get Started &gt;</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginScreen