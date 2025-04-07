// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer" id="footer">
       
            <div className="footer-social">
                <a
                    href="https://www.instagram.com/travisscott/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <span>Instagram</span>
                </a>
                <a
                    href="https://m.facebook.com/travisscottlaflame/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <span>Facebook</span>
                </a>
                <a
                    href="https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <span>Spotify</span>
                </a>
                <a
                    href="https://m.youtube.com/channel/UCtxdfwb9wfkoGocVUAJ-Bmg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <span>YouTube</span>
                </a>
            </div>
        
        </footer>
    );
}

export default Footer;
