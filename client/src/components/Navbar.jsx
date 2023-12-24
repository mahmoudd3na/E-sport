import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import "./Navbar.css";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchUserData(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const userTokenData = await axios.get('http://localhost:3001/users/current', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = userTokenData.data;
            const userPictureData = await axios.get(`http://localhost:3001/users/${user.id}`);
            const userPicture = userPictureData.data.picture;

            setUserData({
                ...user,
                picture: userPicture,
            });

            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nav-bar">
            <div className='left-bar'>
                <NavLink className="nav-link" exact to="/" >Home</NavLink>
                <NavLink className="nav-link" to="/tournaments" activeClassName="active">Tournaments</NavLink>
            </div>
            <Link to="/"> <h1 className='logo'>Esport</h1></Link>
            <div className='right-bar'>
                <NavLink className="nav-link" to="/results" activeClassName="active">Results</NavLink>
                {loading ? (
                    <div>Loading...</div>
                ) : isLoggedIn ? (
                    <Link to="/login">  <img className="user-picture" src={userData.picture} alt="User" /></Link>
                ) : (
                    <Link to="/login"><img className="user-icon" src="/userIcon.png" alt="User Icon" /></Link>
                )}
            </div>
        </div>
    );
}
