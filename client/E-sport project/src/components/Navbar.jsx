import React from 'react'
import { NavLink } from 'react-router-dom'
// import "./NavBar.css"

export default function Navbar() {
    const toggleActivity = (isActive) => {
        return isActive ? { backgroundColor: "rgb(47, 47, 159)" } : undefined
    }
    return (
        <div className="nav-bar">
            <div className='links'>
                <NavLink to="" style={({ isActive }) => toggleActivity(isActive)}>Home</NavLink>
                <NavLink to="Tournaments" style={({ isActive }) => toggleActivity(isActive)}>Tournaments</NavLink>
                <NavLink to="Leaderboard" style={({ isActive }) => toggleActivity(isActive)}>Leaderboard</NavLink>
            </div>
        </div>
    )
}
