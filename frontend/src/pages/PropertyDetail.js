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

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const fetchSpot = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/parkingspots/${id}`);
      setSpot(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load parking spot');
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = React.useCallback(async () => {
    if (!spot || !spot.spaceOwner) return;
    try {
      // Fetch reviews for the space owner
      const response = await axios.get(`http://localhost:5000/api/reviews/${spot.spaceOwner}`);
      setReviews(response.data);
    } catch (err) {
      console.error('Failed to load reviews', err);
    }
  }, [spot]);

  useEffect(() => {
    fetchSpot();
  }, [fetchSpot]);

  useEffect(() => {
    if (spot && spot.spaceOwner) {
      fetchReviews();
    }
  }, [spot, fetchReviews]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/payments', {
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/reviews', {
        booking: 'mock_booking_id', // Placeholder as we don't have a real booking context here
        reviewer: 'mock_user_1', // Placeholder
        reviewee: spot.spaceOwner,
        rating: newReview.rating,
        comment: newReview.comment
      });
      alert('Review submitted!');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(); // Refresh list
    } catch (err) {
      alert('Failed to submit review');
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
        <p><strong>Rating:</strong> ⭐ {spot.averageRating ? spot.averageRating.toFixed(1) : 'N/A'}</p>
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

        <div className="reviews-section" style={{ marginTop: '3rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h2>Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card" style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                  <p><strong>Rating:</strong> {'⭐'.repeat(review.rating)}</p>
                  <p>{review.comment}</p>
                  <small style={{ color: '#666' }}>{new Date(review.createdAt).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleReviewSubmit} style={{ marginTop: '2rem' }}>
            <h3>Leave a Review</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label>Rating: </label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                style={{ padding: '0.5rem' }}
              >
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', minHeight: '80px', marginBottom: '1rem' }}
              required
            />
            <button type="submit" className="btn">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ParkingSpotDetail;
