// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext'; // ✅ Add this import
import '../CSS files/navbar.css';

const Navbar = ({ onFilterChange }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [query, setQuery] = useState('');

  const { user, logout } = useAuth();
  const { resetPlayer } = usePlayer(); // ✅ Destructure resetPlayer
  const navigate = useNavigate();

  const toggleGenreMenu = () => {
    setShowGenreMenu(!showGenreMenu);
    setShowLanguageMenu(false);
    setShowProfileMenu(false);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
    setShowGenreMenu(false);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowGenreMenu(false);
    setShowLanguageMenu(false);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    const updatedGenres = event.target.checked
      ? [...selectedGenres, genre]
      : selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
    onFilterChange({ genres: updatedGenres, languages: selectedLanguages });
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    const updatedLanguages = event.target.checked
      ? [...selectedLanguages, language]
      : selectedLanguages.filter((l) => l !== language);
    setSelectedLanguages(updatedLanguages);
    onFilterChange({ genres: selectedGenres, languages: updatedLanguages });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?keyword=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  const handleLogout = () => {
    const audioEls = document.getElementsByTagName('audio');
    if (audioEls.length > 0) {
      audioEls[0].pause();             // ✅ Stop playback
      audioEls[0].currentTime = 0;
    }

    resetPlayer(); // ✅ Clear currentSong and favorites
    logout();      // ✅ Clear user from localStorage
    navigate('/'); // ✅ Redirect
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Feel Vibe Music</Link>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search songs, artists, movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button"><FaSearch /></button>
        </form>
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/artists" className="nav-link">Artists</Link>

        <div className="dropdown">
          <button onClick={toggleGenreMenu} className="nav-link">Genres</button>
          {showGenreMenu && (
            <div className="dropdown-content">
              <label><input type="checkbox" value="Romantic" onChange={handleGenreChange} /> Romantic</label>
              <label><input type="checkbox" value="Devotional" onChange={handleGenreChange} /> Devotional</label>
              <label><input type="checkbox" value="Folk" onChange={handleGenreChange} /> Folk</label>
              <label><input type="checkbox" value="Party" onChange={handleGenreChange} /> Party</label>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button onClick={toggleLanguageMenu} className="nav-link">Languages</button>
          {showLanguageMenu && (
            <div className="dropdown-content">
              <label><input type="checkbox" value="English" onChange={handleLanguageChange} /> English</label>
              <label><input type="checkbox" value="Hindi" onChange={handleLanguageChange} /> Hindi</label>
              <label><input type="checkbox" value="Telugu" onChange={handleLanguageChange} /> Telugu</label>
            </div>
          )}
        </div>

        <Link to="/favorites" className="nav-link">Favorites</Link>

        <div className="profile-dropdown">
          <button onClick={toggleProfileMenu} className="profile-btn">
            <FaUserCircle />
          </button>
          {showProfileMenu && (
            <div className="profile-menu">
              {user && <p className="profile-welcome">Hi, {user.name}</p>}
              <Link to="/Profile" className="profile-option" onClick={() => setShowProfileMenu(false)}>My Profile</Link>
              <Link to="/about-us" className="profile-option" onClick={() => setShowProfileMenu(false)}>About Us</Link>
              <Link to="/contact-us" className="profile-option" onClick={() => setShowProfileMenu(false)}>Contact Us</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
