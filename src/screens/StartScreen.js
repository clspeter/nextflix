import React, { useState } from 'react'
import './StartScreen.css'
import SingupScreen from './SingupScreen'


function StartScreen() {
    const [signIn, setSignIn] = useState(false);
    if (signIn) {
        return (
            <SingupScreen />
        )
    }
    else {
        return (
            <div>
                <div className="startScreen">
                    <img className="startScreen_logo" src="/nextflix-logo.png" alt="" />
                    <button className="login_button" onClick={() => setSignIn(true)}>Log In</button>
                    <div className="startScreen_top" />
                    <div className="startScreen_background">
                        <div className="startScreen_gradient" />
                        <div className="startScreen_body">
                            <h1>Unlimited films, TV shows, and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="startScreen_input">
                                <form>
                                    <input type="email" placeholder="Email Address" />
                                    <button onClick={() => setSignIn(true)} className="startScreen_getStarted">Get Started &gt;</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StartScreen