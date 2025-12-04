import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="property-card skeleton-card">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-btn"></div>
        </div>
    );
};

export default SkeletonCard;
