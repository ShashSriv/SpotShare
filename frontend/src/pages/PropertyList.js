import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// AI-generated: Property listing page with API data fetching
// Reason: Display all available properties from the backend
// Verified: Tested API calls and data rendering
// Learned: How to use React hooks (useState, useEffect) to manage component state

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load properties');
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Available Properties</h1>
      <Link to="/create-property" className="btn">Add New Property</Link>

      {loading && <p>Loading properties...</p>}
      {error && <p className="error">{error}</p>}

      <div className="properties-grid">
        {properties.length === 0 ? (
          <p>No properties available yet. Be the first to add one!</p>
        ) : (
          properties.map((property) => (
            <div key={property._id} className="property-card">
              <h2>{property.title}</h2>
              <p><strong>Address:</strong> {property.address}</p>
              <p><strong>Price:</strong> ${property.price}/month</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p><strong>Owner:</strong> {property.ownerName}</p>
              <p><strong>Contact:</strong> {property.contactEmail}</p>
              <Link to={`/properties/${property._id}`} className="btn">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyList;
