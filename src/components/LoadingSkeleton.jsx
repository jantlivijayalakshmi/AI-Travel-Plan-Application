import React from 'react';
import './LoadingSkeleton.css';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  if (type === 'card') {
    return (
      <div className="skeleton-grid-wrapper">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="skeleton-destination-card glass-panel">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton-content">
              <div className="skeleton skeleton-h2"></div>
              <div className="skeleton skeleton-p"></div>
              <div className="skeleton skeleton-p w-70"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'itinerary') {
    return (
      <div className="skeleton-itinerary-wrapper">
        <div className="skeleton skeleton-header-banner"></div>
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="skeleton-day-box glass-panel">
            <div className="skeleton skeleton-h3"></div>
            <div className="skeleton-slots-grid">
              <div className="skeleton skeleton-slot"></div>
              <div className="skeleton skeleton-slot"></div>
              <div className="skeleton skeleton-slot"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton skeleton-box-generic"></div>
  );
}
