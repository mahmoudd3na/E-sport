import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

export default function Navbar() {
    const toggleActivity = (isActive) => {
        return isActive ? { backgroundColor: "#FFA41B", color: "white" } : undefined
    }
    return (
        <div className="nav-bar">
            <img className='logo' src="/logo.png" />
            <div className='links'>
                <NavLink>Home</NavLink>
                <NavLink to="Tournaments" style={({ isActive }) => toggleActivity(isActive)}>Tournaments</NavLink>
                <NavLink to="Leaderboard" style={({ isActive }) => toggleActivity(isActive)}>Leaderboard</NavLink>
            </div>
            <div className='search-logo'>
                <img className='search-icon' src="/searchIcon.png" />
                <img className="user-icon" src="/userIcon.png" />

            </div>
        </div>
    )
}
