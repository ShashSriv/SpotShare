import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import CreateProperty from './pages/CreateProperty';

// AI-generated: App routing structure with React Router
// Reason: Set up navigation between pages
// Verified: Routes tested by navigating between pages
// Learned: How to structure multi-page React app with routing

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>🏠 ParkPanther Solutions</h1>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/properties">Properties</a>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/create-property" element={<CreateProperty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
