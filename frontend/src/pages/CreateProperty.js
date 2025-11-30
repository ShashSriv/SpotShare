import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// AI-generated: List parking spot form component for SpaceOwners
// Reason: Allow space owners to list parking spots (implements Parking Spot System)
// Verified: Tested form submission and parking spot creation
// Learned: How to handle geolocation data and pricing tiers

function ListParkingSpot() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    pricePerHour: '',
    pricePerDay: '',
    ownerName: '',
    contactEmail: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Address Autofill State
  const [addressQuery, setAddressQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch address suggestions from Nominatim
  const handleAddressSearch = async (query) => {
    setAddressQuery(query);
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      // Restrict to US and prioritize Pittsburgh area
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&countrycodes=us&viewbox=-80.1,40.5,-79.8,40.3&bounded=1`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Failed to fetch address suggestions', err);
    }
  };

  const selectAddress = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      address: suggestion.display_name,
      latitude: suggestion.lat,
      longitude: suggestion.lon
    }));
    setAddressQuery(suggestion.display_name);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5001/api/parkingspots', formData);
      alert('Parking spot listed successfully! Start earning money!');
      navigate('/spots');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to list parking spot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>List Your Parking Spot</h1>
        <p>Earn money from your unused driveway or garage space</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Parking Spot Title (e.g., Driveway in Oakland)"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description (e.g., covered spot, near Pitt campus, easy access)"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />

          {/* Address Autofill Section */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Address Search (Auto-fill)</label>
            <input
              type="text"
              placeholder="Type to search address (e.g. Cathedral of Learning)..."
              value={addressQuery}
              onChange={(e) => handleAddressSearch(e.target.value)}
              style={{ width: '100%', marginBottom: '0.5rem' }}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                zIndex: 1000,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                {suggestions.map((s) => (
                  <li
                    key={s.place_id}
                    onClick={() => selectAddress(s)}
                    style={{
                      padding: '0.75rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f0f9ff'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            name="address"
            placeholder="Full Address (Auto-filled)"
            value={formData.address}
            onChange={handleChange}
            required
            readOnly
            style={{ background: '#f0f0f0' }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              step="0.0001"
              value={formData.latitude}
              onChange={handleChange}
              required
              readOnly
              style={{ background: '#f0f0f0', flex: 1 }}
            />
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              step="0.0001"
              value={formData.longitude}
              onChange={handleChange}
              required
              readOnly
              style={{ background: '#f0f0f0', flex: 1 }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="number"
              name="pricePerHour"
              placeholder="Price/Hour ($)"
              step="0.50"
              value={formData.pricePerHour}
              onChange={handleChange}
              required
              style={{ flex: 1 }}
            />
            <input
              type="number"
              name="pricePerDay"
              placeholder="Price/Day ($)"
              step="0.50"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
              style={{ flex: 1 }}
            />
          </div>

          <input
            type="text"
            name="ownerName"
            placeholder="Your Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Listing...' : 'List Parking Spot'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListParkingSpot;
