import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../CSS files/Profile.css';

const API_BASE = 'http://localhost:8080/api';

const Profile = () => {
  const { user } = useAuth();
  const [fullUser, setFullUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }

    axios
      .get(`${API_BASE}/users/email?email=${encodeURIComponent(user.email)}`)
      .then(res => setFullUser(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load profile');
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {fullUser?.name}</p>
      <p><strong>Email:</strong> {fullUser?.email}</p>
      <p><strong>Phone:</strong> {fullUser?.phoneNumber}</p>
    </div>
  );
};

export default Profile;
