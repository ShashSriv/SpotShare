import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    return (
        <div className={`toast toast-${type} ${isVisible ? 'show' : ''}`}>
            <span>{message}</span>
            <button onClick={onClose} className="toast-close">×</button>
        </div>
    );
};

export default Toast;
