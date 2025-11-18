import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ParkingSpotList from './pages/ParkingSpotList';
import ParkingSpotDetail from './pages/ParkingSpotDetail';
import ListParkingSpot from './pages/ListParkingSpot';

// AI-generated: App routing structure matching SpotShare (Parking Booking) system
// Reason: Set up navigation for parking spot discovery and booking
// Verified: Routes tested for parking spot viewing and listing
// Learned: How to route multi-step parking booking workflow

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>🅿️ SpotShare - Parking Booking Platform</h1>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/spots">Find Spots</a>
            <a href="/list">List Spot</a>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/spots" element={<ParkingSpotList />} />
          <Route path="/spots/:id" element={<ParkingSpotDetail />} />
          <Route path="/list" element={<ListParkingSpot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
