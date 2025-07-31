// Languages.jsx stays the same as you shared:
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../Components/SongCard';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/Languages.css';

const API_BASE = 'http://localhost:8080/api';

const Languages = () => {
  const { lang } = useParams();
  const [songs, setSongs] = useState([]);
  const { setCurrentSong } = usePlayer();

  useEffect(() => {
    axios.get(`${API_BASE}/songs/language/${encodeURIComponent(lang)}`)
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, [lang]);

  return (
    <div className="languages-page">
      <h2>Language: {lang}</h2>
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

export default Languages;
