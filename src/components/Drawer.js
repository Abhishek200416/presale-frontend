import React from 'react';
import '../styles/Drawer.css';

function Drawer({ isOpen, exitAnimation, children }) {
    return (
        <div className={`custom-drawer-overlay ${isOpen ? 'open' : ''}`}>
            <div className="custom-drawer-content">
                {/* Animated Buttons Block */}
                <div className={`drawer-animated-texts ${exitAnimation ? 'exit' : ''}`}>
                    <button className="drawer-btn drawer-left"></button>
                    <button className="drawer-btn drawer-right"></button>
                </div>
                {/* Existing drawer content */}
                {children}
            </div>
        </div>
    );
}

export default Drawer;
