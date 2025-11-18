import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// AI-generated: Parking spot detail page with booking form
// Reason: Display full spot details and enable booking (implements Booking Management)
// Verified: Tested dynamic routing and booking form submission
// Learned: How to integrate booking workflow with payment processing

function ParkingSpotDetail() {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    startTime: '',
    endTime: '',
    renterName: ''
  });

  useEffect(() => {
    fetchSpot();
  }, [id]);

  const fetchSpot = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/parkingspots/${id}`);
      setSpot(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load parking spot');
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        parkingSpot: id,
        renterName: bookingData.renterName,
        startTime: new Date(bookingData.startTime),
        endTime: new Date(bookingData.endTime),
        totalPrice: 50 // Placeholder
      });
      alert('Booking created! Proceed to payment.');
      setShowBooking(false);
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  if (loading) return <div className="page"><p>Loading parking spot...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!spot) return <div className="page"><p>Parking spot not found</p></div>;

  return (
    <div className="page">
      <Link to="/spots">← Back to Parking Spots</Link>
      <div className="property-detail">
        <h1>{spot.title}</h1>
        <p><strong>Address:</strong> {spot.address}</p>
        <p><strong>Price per Hour:</strong> ${spot.pricePerHour} | <strong>Per Day:</strong> ${spot.pricePerDay}</p>
        <p><strong>Description:</strong> {spot.description}</p>
        <p><strong>Space Owner:</strong> {spot.ownerName}</p>
        <p><strong>Rating:</strong> ⭐ {spot.averageRating.toFixed(1)}</p>
        <p><strong>Contact Email:</strong> {spot.contactEmail}</p>

        {!showBooking ? (
          <button className="btn" onClick={() => setShowBooking(true)}>Book This Spot</button>
        ) : (
          <form onSubmit={handleBooking} className="booking-form">
            <h3>Book Parking Spot</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={bookingData.renterName}
              onChange={(e) => setBookingData({ ...bookingData, renterName: e.target.value })}
              required
            />
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={bookingData.startTime}
              onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
              required
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              value={bookingData.endTime}
              onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
              required
            />
            <button type="submit" className="btn">Confirm Booking</button>
            <button type="button" className="btn" onClick={() => setShowBooking(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ParkingSpotDetail;
