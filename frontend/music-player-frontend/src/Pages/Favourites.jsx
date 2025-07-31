import React from 'react';
import SongCard from '../Components/SongCard';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/Favourites.css';

const Favorites = () => {
  const { favorites, setCurrentSong, removeFromFavorites } = usePlayer();

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <div className="song-list">
          {favorites.map((fav) => (
            <SongCard
              key={`${fav.songId}-${fav.songName}`}
              song={{
                id: fav.songId,
                songName: fav.songName,
                artists: fav.artist,
                image: fav.image,
                movieName: fav.movieName || 'Unknown',
                url: fav.url || '',
              }}
              onPlay={() =>
                setCurrentSong({
                  id: fav.songId,
                  songName: fav.songName,
                  artists: fav.artist,
                  image: fav.image,
                  movieName: fav.movieName || 'Unknown',
                  url: fav.url || '',
                })
              }
              onAddToFavorites={() => {
                console.log('Add to Favorites');
              }}
              onRemoveFromFavorites={(songId) => {
                removeFromFavorites(songId);  // This will trigger removal
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
