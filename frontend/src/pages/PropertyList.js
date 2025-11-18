import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// AI-generated: Parking spot listing page with API data fetching
// Reason: Display all available parking spots from backend (implements Booking Management subsystem)
// Verified: Tested API calls and spot rendering
// Learned: How to fetch and display real-time parking availability

function ParkingSpotList() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/parkingspots');
      setSpots(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load parking spots');
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Available Parking Spots in Oakland</h1>
      <Link to="/list" className="btn">List Your Parking Spot</Link>

      {loading && <p>Loading parking spots...</p>}
      {error && <p className="error">{error}</p>}

      <div className="properties-grid">
        {spots.length === 0 ? (
          <p>No parking spots available yet. Be the first to list one!</p>
        ) : (
          spots.map((spot) => (
            <div key={spot._id} className="property-card">
              <h2>{spot.title}</h2>
              <p><strong>Address:</strong> {spot.address}</p>
              <p><strong>Price per Hour:</strong> ${spot.pricePerHour} | <strong>Per Day:</strong> ${spot.pricePerDay}</p>
              <p><strong>Owner:</strong> {spot.ownerName}</p>
              <p><strong>Rating:</strong> ⭐ {spot.averageRating.toFixed(1)}</p>
              <p><strong>Contact:</strong> {spot.contactEmail}</p>
              <Link to={`/spots/${spot._id}`} className="btn">View & Book</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ParkingSpotList;
