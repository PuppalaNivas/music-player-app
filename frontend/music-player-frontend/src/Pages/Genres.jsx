// Genres.jsx stays the same as you shared:
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../Components/SongCard';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/Genres.css';

const API_BASE = 'http://localhost:8080/api';

const Genres = () => {
  const { genre } = useParams();
  const [songs, setSongs] = useState([]);
  const { setCurrentSong } = usePlayer();

  useEffect(() => {
    axios.get(`${API_BASE}/songs/genre/${encodeURIComponent(genre)}`)
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, [genre]);

  return (
    <div className="genres-page">
      <h2>Genre: {genre}</h2>
      <div className="song-list">
        {songs.map(song => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={() => setCurrentSong(song)}
          />
        ))}
      </div>
    </div>
  );
};

export default Genres;
