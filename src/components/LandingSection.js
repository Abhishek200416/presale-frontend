import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import '../styles/LandingSection.css';

// Custom hook to observe if wallet modal is open (via body class)
function useWalletModalOpen() {
    const [walletModalOpen, setWalletModalOpen] = useState(
        document.body.classList.contains('wallet-modal-open')
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setWalletModalOpen(document.body.classList.contains('wallet-modal-open'));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return walletModalOpen;
}

function LandingSection({ onDrawerToggle }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [animClass, setAnimClass] = useState(""); // For toggle image scaling
    const [menuKey, setMenuKey] = useState(0); // Re-trigger menu animation on open
    const [exitAnimation, setExitAnimation] = useState(false); // Trigger exit animation for texts and menu

    const walletModalOpen = useWalletModalOpen();

    // Adjust toggle button position when footer nears view (only when closed)
    useEffect(() => {
        const handleScroll = () => {
            if (isDrawerOpen) return;
            const footer = document.getElementById('footer');
            const toggleButton = document.getElementById('toggleButton');
            if (footer && toggleButton) {
                const footerRect = footer.getBoundingClientRect();
                const buttonHeight = toggleButton.offsetHeight;
                if (footerRect.top < window.innerHeight - buttonHeight - 20) {
                    const overlap = window.innerHeight - footerRect.top + 20;
                    toggleButton.style.bottom = `${overlap}px`;
                } else {
                    toggleButton.style.bottom = '30px';
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDrawerOpen]);

    const toggleDrawer = () => {
        const newState = !isDrawerOpen;
        if (onDrawerToggle) {
            onDrawerToggle(newState);
        }
        setAnimClass("scale-out");
        setTimeout(() => {
            if (isDrawerOpen) {
                setExitAnimation(true);
                setTimeout(() => {
                    setIsDrawerOpen(false);
                    setExitAnimation(false);
                    document.body.classList.remove('drawer-open');
                    setAnimClass("scale-in");
                    setTimeout(() => setAnimClass(""), 300);
                }, 500);
            } else {
                setMenuKey(prev => prev + 1);
                setIsDrawerOpen(true);
                document.body.classList.add('drawer-open');
                const toggleButton = document.getElementById('toggleButton');
                if (toggleButton) {
                    toggleButton.style.bottom = '30px';
                }
                setAnimClass("scale-in");
                setTimeout(() => setAnimClass(""), 300);
            }
        }, 300);
    };

    // Function to scroll to the PresaleFlow purchase section with an offset
    const scrollToPresale = () => {
        const presaleSection = document.getElementById('presale-section');
        if (presaleSection) {
            const offset = -100; // Adjust this value to move higher (-100 moves 100px higher)
            const y = presaleSection.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section className="custom-landing-section">
          
            <div className="custom-landing-text">
                <h1>UTOPIA</h1>
                <p className="p1">EXCLUSIVE $UTOPIA PRESALE GET IN EARLY</p>
                <p className="p3">
                    $UTOPIA IS HERE, AND THIS IS YOUR CHANCE TO GRAB IT BEFORE THE HYPE EXPLODES, LIMITED SUPPLY,
                    MAXIMUM POTENTIAL - DON'T MISS OUT. JOIN THE PRESALE NOW!
                </p>

                <button className="join-presale-btn" onClick={scrollToPresale}>
                    JOIN PRESALE NOW
                </button>
            </div>
            {/* Toggle Button � hide when wallet modal is open */}
            {!walletModalOpen && (
                <button id="toggleButton" className="custom-drawer-toggle" onClick={toggleDrawer}>
                    {isDrawerOpen ? (
                        <img className={animClass} src="/img/logos/whitedesine X inside round.png" alt="Close Menu" />
                    ) : (
                        <img className={animClass} src="/img/logos/whitedesine inside round.png" alt="Open Menu" />
                    )}
                </button>
            )}
            {/* Drawer with custom content */}
            <Drawer isOpen={isDrawerOpen} exitAnimation={exitAnimation}>
                <div className="drawer-inner-content">
                    <div className="drawer-logo">
                        <img src="/img/logos/logo.png" alt="Logo" />
                    </div>
                    <div className={`drawer-menu ${exitAnimation ? "exit" : ""}`} key={menuKey}>
                        <div className="drawer-menu-item"> <a href="https://www.travisscott.com/tour/"> TOUR </a></div>
                        <div className="drawer-menu-item"><a href="https://www.travisscott.com/utopia-world/"> UTOPIA WORLD </a></div>
                        <div className="drawer-menu-item"> <a href="https://shop.travisscott.com/"> UTOPIA SHOP </a></div>
                        <div className="drawer-menu-item">  <a href="https://www.travisscott.com/explore/">UTOPIA ALBUM </a></div>
                    </div>
                </div>
            </Drawer>
        </section>
    );
}

export default LandingSection;
