import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./Navbar.css";
import Login from '../pages/Login';

export default function Navbar() {
    return (
        <div className="nav-bar">
            <div className='left-bar'>
                <NavLink className="nav-link" exact to="/" >Home</NavLink>
                <NavLink className="nav-link" to="/tournaments" activeClassName="active">Tournaments</NavLink>
            </div>
            <Link to="/"> <h1 className='logo'>Esport</h1></Link>
            <div className='right-bar'>
                <NavLink className="nav-link" to="/results" activeClassName="active">Results</NavLink>
                <Link to="/login"><img className="user-icon" src="/userIcon.png" alt="User Icon" /></Link>
            </div>
        </div>
    );
}
