import React from 'react';
import '../styles/Navbar.css';

function Navbar({ showTokens }) {
    return (
        <div className="navbar-minimal">
            {/* Top-left: TOUR */}
            <div className="nav-left">
                <a href="https://www.travisscott.com/tour/" className="nav-link">TOUR</a>
            </div>

            {/* Center: Logo */}
            <div className="custom-landing-logo">
                <img src="/img/logos/logo.png" alt="Logo" />
            </div>
         
            {/* Top-right: SHOP */}
            <div className="nav-right">
                <a href="https://shop.travisscott.com/" className="nav-link">SHOP</a>
            </div>

     
        </div>
    );
}

export default Navbar;
