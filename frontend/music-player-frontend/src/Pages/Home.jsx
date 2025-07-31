// Home.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getAllSongs } from '../Services/api'; // ✅ Updated import
import SongCard from '../Components/SongCard';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/Home.css';

const Home = ({ filters }) => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentSong, addToFavorites, setSongs: setGlobalSongs } = usePlayer(); // ✅ Destructure setSongs

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  useEffect(() => {
    setLoading(true);
    getAllSongs()
      .then((res) => {
        setSongs(res.data);
        setGlobalSongs(res.data); // ✅ Push to PlayerContext
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load songs. Please try again.');
        setLoading(false);
      });
  }, [setGlobalSongs]);

  const filterSongs = useCallback(() => {
    setFilteredSongs(
      songs.filter((song) => {
        const matchesGenre = filters.genres.length === 0 || filters.genres.includes(song.genre);
        const matchesLanguage = filters.languages.length === 0 || filters.languages.includes(song.language);
        const matchesSearch =
          song.songName.toLowerCase().includes(keyword) ||
          song.artist.toLowerCase().includes(keyword) ||
          song.movieName.toLowerCase().includes(keyword);

        return matchesGenre && matchesLanguage && matchesSearch;
      })
    );
  }, [songs, keyword, filters]);

  useEffect(() => {
    filterSongs();
  }, [songs, filters, filterSongs]);

  const getSongsByCategory = (category) => {
    if (category === 'Trending') {
      return filteredSongs.filter(song => song.trending);
    } else if (category === 'NewRelease') {
      return filteredSongs.filter(song => song.newRelease);
    } else if (!isNaN(category)) {
      return filteredSongs.filter(song => song.releaseYear === parseInt(category));
    } else {
      return filteredSongs.filter(song => song.language.toLowerCase() === category.toLowerCase());
    }
  };

  return (
    <div className="home-page">
      {!keyword && <h2 className="welcome-text">{getGreeting()}</h2>}
      {keyword && filteredSongs.length > 0 && (
        <h2 className="search-title">Search results for "{keyword}"</h2>
      )}
      {keyword && filteredSongs.length === 0 && (
        <h2 className="search-title">No results found for "{keyword}"</h2>
      )}

      {keyword && (
        <Link to="/" className="back-button">Back to Home</Link>
      )}

      <div className="song-list">
        {loading && <p>Loading songs...</p>}
        {error && <p className="error">{error}</p>}

        {!keyword && (
          <>
            <section className="song-category">
              <h3>Trending now</h3>
              <div className="horizontal-scroll">
                {getSongsByCategory('Trending').map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onPlay={() => setCurrentSong(song)}
                    onAddToFavorites={() => addToFavorites(song)}
                  />
                ))}
              </div>
            </section>

            <section className="song-category">
              <h3>New releases</h3>
              <div className="horizontal-scroll">
                {getSongsByCategory('NewRelease').map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onPlay={() => setCurrentSong(song)}
                    onAddToFavorites={() => addToFavorites(song)}
                  />
                ))}
              </div>
            </section>

            <section className="song-category">
              <h3>Releases in 2024</h3>
              <div className="horizontal-scroll">
                {getSongsByCategory('2024').map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onPlay={() => setCurrentSong(song)}
                    onAddToFavorites={() => addToFavorites(song)}
                  />
                ))}
              </div>
            </section>

            <section className="song-category">
              <h3>Telugu Picks</h3>
              <div className="horizontal-scroll">
                {getSongsByCategory('Telugu').map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onPlay={() => setCurrentSong(song)}
                    onAddToFavorites={() => addToFavorites(song)}
                  />
                ))}
              </div>
            </section>

            <section className="song-category">
              <h3>Hindi Picks</h3>
              <div className="horizontal-scroll">
                {getSongsByCategory('Hindi').map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onPlay={() => setCurrentSong(song)}
                    onAddToFavorites={() => addToFavorites(song)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {keyword && filteredSongs.length > 0 && (
          <div className="songs-grid">
            {filteredSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={() => setCurrentSong(song)}
                onAddToFavorites={() => addToFavorites(song)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
