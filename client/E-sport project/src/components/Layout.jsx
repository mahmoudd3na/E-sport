import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import "./Layout.css";

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
