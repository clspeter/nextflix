import React, { useEffect } from 'react'
import './Nav.css'

export default function Nav() {
    const [show, handleShow] = React.useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])

    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <div className="nav_contents">
                <img className="nav_logo" src="/nextflix-logo.png" alt="" />
                <img className="nav_avatar" src="/nextflix-avatar.png" alt="" />
            </div>
        </div>
    )
}
