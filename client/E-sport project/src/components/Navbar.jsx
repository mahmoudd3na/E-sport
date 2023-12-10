import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

export default function Navbar() {

    const toggleActivity = (isActive) => {
        return isActive ? "active-bar" : undefined
    }
    return (
        <div className="nav-bar">
            <div className='left-bar header-links'>
                <NavLink>Home</NavLink>
                <NavLink to="Tournaments" className={({ isActive }) => toggleActivity(isActive)}>Tournaments</NavLink>
            </div>
            <h1 className='logo'>Esport</h1>
            <div className='right-bar header-links'>
                <NavLink to="Leaderboard" className={({ isActive }) => toggleActivity(isActive)}>Leaderboard</NavLink>
                <img className="user-icon" src="/userIcon.png" />
            </div>
        </div>
    )
}
