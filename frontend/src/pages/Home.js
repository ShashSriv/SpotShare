import React from 'react';

function Home() {
  return (
    <div className="page">
      <h1>Welcome to ParkPanther Solutions</h1>
      <p>Find your perfect residential home with ease.</p>
      <div className="home-content">
        <div className="feature">
          <h2>🔍 Search Properties</h2>
          <p>Browse available residential properties in your area.</p>
        </div>
        <div className="feature">
          <h2>🔐 Secure Authentication</h2>
          <p>Create an account and manage your property listings securely.</p>
        </div>
        <div className="feature">
          <h2>📧 Connect with Owners</h2>
          <p>Get in touch with property owners directly through our platform.</p>
        </div>
      </div>
      <a href="/properties" className="btn">Start Browsing</a>
    </div>
  );
}

export default Home;
