import React, { useEffect, useState } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/SongCard.css';

const SongCard = ({ song, onPlay, onAddToFavorites, onRemoveFromFavorites }) => {
  const { favorites } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favStatus = favorites.some(fav => fav.songId === song.id);
    setIsFavorite(favStatus);
  }, [favorites, song.id]);

  const handleFavClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      onRemoveFromFavorites(song.id);
    } else {
      onAddToFavorites(song);
    }
  };

  return (
    <div className="song-card" onClick={() => onPlay(song)}>
      <img src={song.image} alt={song.songName} />
      <div className="song-info">
        <h3>{song.songName}</h3>
        <p>{song.artist}</p>
        <p>{song.movieName}</p>

        <div className="song-actions">
          <button className="play-btn" onClick={(e) => { e.stopPropagation(); onPlay(song); }}>
           Play<FaPlay />
          </button>
          <button
            className={`fav-btn ${isFavorite ? 'fav-active' : ''}`}
            onClick={handleFavClick}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;