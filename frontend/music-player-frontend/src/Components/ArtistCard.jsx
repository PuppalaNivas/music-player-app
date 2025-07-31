// /components/ArtistCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS files/ArtistCard.css'

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <img src={artist.image} alt={artist.name} />
      <h3>{artist.name}</h3>
      <Link to={`/artists/${artist.id}`}>View Songs</Link>
    </div>
  );
};

export default ArtistCard;
