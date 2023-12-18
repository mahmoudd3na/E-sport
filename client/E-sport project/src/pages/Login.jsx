import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import './Login.css';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in
        const token = localStorage.getItem('accessToken');
        if (token) {
            // If a token is found, fetch user data
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => { //this is fetching through the token 
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
                picture: userPicture
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('accessToken');
            setUserData(null);
            setIsLoggedIn(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:3001/users/login', data);
            const token = response.data.accessToken;
            console.log(token)
            localStorage.setItem('accessToken', token);

            // Fetch user data after successful login
            fetchUserData(token);

        } catch (error) {
            console.error('Login failed:', error);
            if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }
    };
    const handleSignOut = () => {
        // Clear the token from localStorage and reset the login state
        localStorage.removeItem('accessToken');
        setUserData(null);
        setIsLoggedIn(false);
    };

    return (
        <>
            {isLoggedIn ? (
                <div>
                    <UserProfile email={userData.email} picture={userData.picture} username={userData.username} />
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>

            ) : (
                <div className="signin-container">
                    <h2>Sign in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required />
                        </div>

                        <button type="submit">Sign In</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <p className="signup-link">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            )}
        </>
    );
}
