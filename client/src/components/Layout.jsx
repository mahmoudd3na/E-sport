import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import { Outlet } from 'react-router-dom'
import "./Layout.css";

export default function Layout() {
    return (
        <>
            <div className='layout'>
                <Navbar />
                <Outlet />
            </div>
            <Footer />

        </>

    )
}
