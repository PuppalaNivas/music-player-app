import React, { useEffect, useState } from 'react';
import SongCard from '../Components/SongCard';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/Artists.css';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const Artists = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { setCurrentSong } = usePlayer();

  useEffect(() => {
    axios.get(`${API_BASE}/songs`)
      .then(res => {
        setSongs(res.data);

        // Extract unique artists with their images
        const uniqueArtistsMap = {};
        res.data.forEach(song => {
          if (!uniqueArtistsMap[song.artist]) {
            uniqueArtistsMap[song.artist] = song.artistImage;
          }
        });

        // Convert to array of objects: { name, image }
        const uniqueArtists = Object.keys(uniqueArtistsMap).map(artistName => ({
          name: artistName,
          image: uniqueArtistsMap[artistName]
        }));

        setArtists(uniqueArtists);
      })
      .catch(err => console.error(err));
  }, []);

  const handleArtistClick = (artistName) => {
    const artistSongs = songs.filter(song => song.artist === artistName);
    setFilteredSongs(artistSongs);
  };

  return (
    <div className="artists-page">
      <h2>Artists</h2>

      <div className="artist-list">
        {artists.map((artist, index) => (
          <div key={index} className="artist-card" onClick={() => handleArtistClick(artist.name)}>
            <img src={artist.image} alt={artist.name} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>

      {filteredSongs.length > 0 && <h3>Songs by Selected Artist</h3>}

      <div className="song-list">
        {filteredSongs.map(song => (
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

export default Artists;
