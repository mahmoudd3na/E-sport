import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-media">
                <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter">
                        <img src='/twitter.png' />
                    </i>
                </a>
                <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook">
                        <img src='/facebook.png' />

                    </i>
                </a>
                <a href="https://whatsapp.com/example" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatapp">
                        <img src='/whatsapp.png' />

                    </i>
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
