// Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-media">
                <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                </a>
            </div>
            <div className="footer-content">
                <p>&copy; 2023  Esports Website. All rights reserved.</p>
                <p>Designed by M7mod</p>
            </div>
        </footer>
    );
};

export default Footer;
