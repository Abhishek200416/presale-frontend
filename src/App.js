import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingSection from './components/LandingSection';
import PresaleFlow from './components/PresaleFlow';
import LiveFeed from './components/LiveFeed';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    const [theme, setTheme] = useState('dark');
    const [showTokens, setShowTokens] = useState(true);

    // Updated toggle function to accept a theme parameter.
    const toggleTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    // Callback to hide/show the Buy Tokens button based on drawer state.
    const handleDrawerToggle = (isOpen) => {
        setShowTokens(!isOpen);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className="App">
            <Navbar showTokens={showTokens} />
            <LandingSection onDrawerToggle={handleDrawerToggle} />
            <div className="main-content">
                <PresaleFlow />
                <LiveFeed />
            </div>
            <Footer />
        </div>
    );
}

export default App;
