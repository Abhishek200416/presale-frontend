import React from 'react';

function NotificationModal({ message, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2 className="notification">{message}</h2>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default NotificationModal;
