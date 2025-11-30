import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ParkingSpotList from './pages/PropertyList';
import ParkingSpotDetail from './pages/PropertyDetail';
import ListParkingSpot from './pages/CreateProperty';

// AI-generated: App routing structure matching SpotShare (Parking Booking) system
// Reason: Set up navigation for parking spot discovery and booking
// Verified: Routes tested for parking spot viewing and listing
// Learned: How to route multi-step parking booking workflow

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>🅿️ ParkPanthers - Parking Booking Platform</h1>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/spots">Find Spots</a>
            <a href="/list">List Spot</a>
            {user ? (
              <>
                <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Welcome, {user.name}</span>
                <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/spots" element={<ParkingSpotList />} />
          <Route path="/spots/:id" element={<ParkingSpotDetail />} />
          <Route path="/list" element={<ListParkingSpot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
