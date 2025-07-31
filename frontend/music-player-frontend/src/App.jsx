import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import PlayerFooter from './Components/PlayerFooter';
import { useAuth } from './context/AuthContext';
import AuthOverlay from './Components/AuthOverlay';
import './App.css';

// Pages
import Home from './Pages/Home';
import Artists from './Pages/Artists';
import Genres from './Pages/Genres';
import Languages from './Pages/Languages';
import Favorites from './Pages/Favourites';
import Profile from './Pages/Profile';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';

function App() {
  const [filters, setFilters] = useState({ genres: [], languages: [] });
  const { user } = useAuth();

  return (
    <div className="app-wrapper">
      {/* App content */}
      <div className={`app-container ${!user ? 'blur-background' : ''}`}>
        <Navbar onFilterChange={setFilters} />
        <Routes>
          <Route path="/" element={<Home filters={filters} />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <PlayerFooter />
      </div>

      {/* Show overlay when user is not logged in */}
      {!user && <AuthOverlay />}
    </div>
  );
}

export default App;
