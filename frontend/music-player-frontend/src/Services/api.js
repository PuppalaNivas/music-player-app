// /services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL of your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSongsByKeyword = (keyword) => {
  return instance.get(`/songs/search?keyword=${keyword}`);
};

export const registerUser = (user) => {
  return instance.post('/users/register', user);
};

export const loginUser = (email, password) => {
  return instance.post('/users/login', { email, password });
};

export const getFavorites = (userId) => {
  return instance.get(`/favorites/user/${userId}`);
};

export const addFavorite = (favorite) => {
  return instance.post('/favorites', favorite);
};

export const removeFavorite = (userId, songId) => {
  return instance.delete(`/favorites/user/${userId}/song/${songId}`);
};

export const getAllSongs = () => {
  return instance.get('/songs');
};

// Other API calls can be added as needed.
