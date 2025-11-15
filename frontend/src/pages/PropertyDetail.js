import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// AI-generated: Property detail page component
// Reason: Display full details of a single property
// Verified: Tested dynamic routing and API parameter passing
// Learned: How to use URL parameters with React Router

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setProperty(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load property');
      setLoading(false);
    }
  };

  if (loading) return <div className="page"><p>Loading property...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!property) return <div className="page"><p>Property not found</p></div>;

  return (
    <div className="page">
      <Link to="/properties">← Back to Properties</Link>
      <div className="property-detail">
        <h1>{property.title}</h1>
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>Price:</strong> ${property.price}/month</p>
        <p><strong>Description:</strong> {property.description}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Owner:</strong> {property.ownerName}</p>
        <p><strong>Contact Email:</strong> {property.contactEmail}</p>
        <a href={`mailto:${property.contactEmail}`} className="btn">Contact Owner</a>
      </div>
    </div>
  );
}

export default PropertyDetail;
