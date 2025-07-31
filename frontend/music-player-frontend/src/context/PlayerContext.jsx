// PlayerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../Services/api';

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      getFavorites(user.id)
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error('Failed to load favorites', err));
    } else {
      setFavorites([]);
    }
  }, [user]);

  const playSong = (song, index = 0) => {
    setCurrentSong(song);
    setCurrentIndex(index);
  };

  const playNext = () => {
    if (!songs.length) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const playPrev = () => {
    if (!songs.length) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const addToFavorites = (song) => {
    if (!user) return;
    const alreadyFav = favorites.some(fav => fav.songId === song.id);
    if (alreadyFav) return;

    const favorite = { userId: user.id, songId: song.id };
    addFavorite(favorite)
      .then(() => {
        setFavorites(prev => [...prev, { ...song, songId: song.id }]);
      })
      .catch((err) => console.error('Failed to add favorite', err));
  };

  const removeFromFavorites = (songId) => {
    if (!user) return;
    removeFavorite(user.id, songId)
      .then(() => {
        setFavorites(prev => prev.filter(fav => fav.songId !== songId));
      })
      .catch(err => console.error('Failed to remove favorite', err));
  };

  const resetPlayer = () => {
    setCurrentSong(null);
    setCurrentIndex(0);
    setSongs([]);
    setFavorites([]);
    setUser(null);
  };

  return (
    <PlayerContext.Provider
      value={{
        songs, setSongs,
        currentSong, setCurrentSong,
        currentIndex, setCurrentIndex,
        playSong, playNext, playPrev,
        favorites, addToFavorites, removeFromFavorites,
        user, setUser, resetPlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
