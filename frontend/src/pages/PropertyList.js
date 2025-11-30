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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price_asc');

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/parkingspots');
      setSpots(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load parking spots');
      setLoading(false);
    }
  };

  // Filter and Sort Logic
  const filteredSpots = spots
    .filter(spot => {
      const term = searchTerm.toLowerCase();
      return (
        spot.title.toLowerCase().includes(term) ||
        spot.address.toLowerCase().includes(term) ||
        spot.description.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'price_desc') return b.pricePerHour - a.pricePerHour;
      if (sortBy === 'rating') return b.averageRating - a.averageRating;
      return 0;
    });

  return (
    <div className="page">
      <h1>Available Parking Spots in Oakland</h1>

      <div className="actions-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/list" className="btn">List Your Parking Spot</Link>

        <input
          type="text"
          placeholder="Search by location or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', flex: 1, minWidth: '200px' }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {loading && <p>Loading parking spots...</p>}
      {error && <p className="error">{error}</p>}

      <div className="properties-grid">
        {filteredSpots.length === 0 ? (
          <p>No parking spots found matching your search.</p>
        ) : (
          filteredSpots.map((spot) => (
            <div key={spot._id} className="property-card">
              <h2>{spot.title}</h2>
              <p><strong>Address:</strong> {spot.address}</p>
              <p><strong>Price per Hour:</strong> ${spot.pricePerHour} | <strong>Per Day:</strong> ${spot.pricePerDay}</p>
              <p><strong>Owner:</strong> {spot.ownerName}</p>
              <p><strong>Rating:</strong> ⭐ {spot.averageRating ? spot.averageRating.toFixed(1) : 'N/A'}</p>
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
