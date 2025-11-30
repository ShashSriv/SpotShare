import React from 'react';

// AI-generated: Home page reflecting SpotShare parking booking platform
// Reason: Showcase platform value for both renters and space owners
// Verified: Page displays correctly with all features
// Learned: How to create compelling landing page messaging

function Home() {
  return (
    <div className="page">
      <h1>Welcome to ParkPanthers 🅿️</h1>
      <p>Find reliable parking spots in Oakland or earn money by sharing your space!</p>
      <div className="home-content">
        <div className="feature">
          <h2>🔍 Find Available Spots</h2>
          <p>Search nearby parking spots by location, price, and availability. Book instantly with secure payments.</p>
        </div>
        <div className="feature">
          <h2>💰 Earn from Your Space</h2>
          <p>List your parking spot and earn money from unused driveway or garage space during work hours.</p>
        </div>
        <div className="feature">
          <h2>⭐ Trusted Community</h2>
          <p>User ratings and reviews ensure safety and reliability for both renters and space owners.</p>
        </div>
      </div>
      <div className="home-actions">
        <a href="/spots" className="btn">Find Parking Spots</a>
        <a href="/list" className="btn">List Your Space</a>
      </div>
    </div>
  );
}

export default Home;
