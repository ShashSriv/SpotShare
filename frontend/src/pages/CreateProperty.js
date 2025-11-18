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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/parkingspots', formData);
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
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="latitude"
            placeholder="Latitude (e.g., 40.4406)"
            step="0.0001"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude (e.g., -79.9959)"
            step="0.0001"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="pricePerHour"
            placeholder="Price per Hour ($)"
            step="0.50"
            value={formData.pricePerHour}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price per Day ($)"
            step="0.50"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
          />
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
